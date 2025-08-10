import { NextResponse } from 'next/server'

// Optional: set this in your .env.local as AMAZON_ASSOC_TAG=yourtag-20
const AFFILIATE_TAG = process.env.AMAZON_ASSOC_TAG || 'yourtag-20'
const AMAZON_BASE = 'https://www.amazon.com'

function createAffiliateSearchLink(query) {
  const url = new URL(`${AMAZON_BASE}/s`)
  url.searchParams.set('k', query)
  url.searchParams.set('tag', AFFILIATE_TAG)
  return url.toString()
}

function addAffiliateTagToUrl(url) {
  try {
    const u = new URL(url.startsWith('http') ? url : AMAZON_BASE + url)
    // Preserve existing params and append tag
    u.searchParams.set('tag', AFFILIATE_TAG)
    return u.toString()
  } catch {
    return url
  }
}

async function fetchSearchHtml(query) {
  const url = `${AMAZON_BASE}/s?k=${encodeURIComponent(query)}`
  
  try {
    // Create an AbortController for timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000); // 8 second timeout
    
    // Make the request look like a real browser to reduce blocking
    const res = await fetch(url, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124 Safari/537.36',
        'Accept-Language': 'en-US,en;q=0.9',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Cache-Control': 'no-cache',
        'Referer': 'https://www.amazon.com/'
      },
      signal: controller.signal,
      next: { revalidate: 0 },
    })
    
    clearTimeout(timeoutId);
    
    if (!res.ok) {
      console.log('Amazon fetch failed with status:', res.status);
      return null; // Return null instead of throwing
    }
    
    return await res.text()
  } catch (error) {
    console.log('Amazon fetch error:', error.message);
    return null; // Return null for any error
  }
}

// Best-effort, lightweight parsing without external deps
function parseResults(html, maxItems = 6) {
  const results = []
  // Split by each search result block
  const blocks = html.split('data-component-type="s-search-result"')
  
  for (let i = 1; i < blocks.length; i++) {
    const block = blocks[i]

    // Title and link
    const h2Match = block.match(/<h2[^>]*>\s*<a[^>]+href="([^"]+)"[^>]*>\s*<span[^>]*>([^<]+)<\/span>/i)
    const href = h2Match?.[1]
    const title = h2Match?.[2]?.trim()

    if (!href || !title) continue

    // Image - Try multiple patterns to catch different Amazon layouts
    let img = null
    const imgPatterns = [
      /<img[^>]+data-image-src="([^"]+)"/i,
      /<img[^>]+src="([^"]+)"/i,
      /<img[^>]+data-src="([^"]+)"/i,
      /<img[^>]+srcset="([^"\s,]+)/i, // Take first URL from srcset
      /<img[^>]+data-image-latency="[^"]*"[^>]+src="([^"]+)"/i,
    ]
    
    for (const pattern of imgPatterns) {
      const match = block.match(pattern)
      if (match?.[1]) {
        img = match[1]
        // Clean up the image URL
        if (img.startsWith('//')) img = 'https:' + img
        if (img.includes('data:image')) continue // Skip data URLs
        if (img.includes('.gif')) continue // Skip placeholder gifs
        console.log('Found image:', img) // Debug log
        break
      }
    }

    // Price (best-effort from whole + fraction)
    let price = null
    const priceWhole = block.match(/a-price-whole">([^<]+)<\/span>/i)?.[1]?.replace(/[,.]/g, '')
    const priceFraction = block.match(/a-price-fraction">([^<]+)<\/span>/i)?.[1]
    if (priceWhole) {
      const wholeNum = parseInt(priceWhole) || 0
      const formatted = `$${wholeNum}${priceFraction ? '.' + priceFraction : ''}`
      price = formatted
    } else {
      // Alternative price patterns
      const altPricePatterns = [
        /<span[^>]*class="a-offscreen"[^>]*>(\$[^<]+)<\/span>/i,
        /<span[^>]*class="[^"]*a-price[^"]*"[^>]*>(\$[^<]+)<\/span>/i,
        /\$(\d+(?:\.\d{2})?)/i
      ]
      for (const pattern of altPricePatterns) {
        const match = block.match(pattern)
        if (match?.[1]) {
          price = match[1].startsWith('$') ? match[1] : '$' + match[1]
          break
        }
      }
    }

    // Build affiliate product URL
    const productUrl = addAffiliateTagToUrl(href)

    results.push({
      title,
      url: productUrl,
      image: img,
      price: price || undefined,
    })

    if (results.length >= maxItems) break
  }
  return results
}

export async function POST(req) {
  try {
    const body = await req.json().catch(() => ({}))
    const query = body.query || body.productName || ''
    if (!query) {
      return NextResponse.json({ error: 'Missing query' }, { status: 400 })
    }

    const affiliateSearchLink = createAffiliateSearchLink(query)

    let items = []
    try {
      const html = await fetchSearchHtml(query)
      if (html) {
        items = parseResults(html)
        // Ensure all items have affiliate tags
        items = items.map(it => ({ ...it, url: addAffiliateTagToUrl(it.url) }))
      } else {
        // Amazon scraping failed, create a fallback item with just the search link
        items = [{
          title: query,
          url: affiliateSearchLink,
          image: null,
          price: null
        }]
      }
    } catch (e) {
      console.log('Amazon parsing error:', e.message);
      // Graceful fallback: return only the affiliate search link
      items = [{
        title: query,
        url: affiliateSearchLink,
        image: null,
        price: null
      }]
    }

    return NextResponse.json({
      query,
      affiliateSearchLink,
      items,
      note: items.length === 0 ? 'Fell back to search link; scraping may be blocked or no results found.' : undefined
    })
  } catch (error) {
    return NextResponse.json({ error: error.message || 'Failed to fetch products' }, { status: 500 })
  }
}

export async function GET(req) {
  // Simple test via /api/amazon?q=Wireless%20Headphones
  const { searchParams } = new URL(req.url)
  const q = searchParams.get('q')
  if (!q) return NextResponse.json({ error: 'Missing q' }, { status: 400 })
  const resp = await POST(new Request(req.url, { method: 'POST', body: JSON.stringify({ query: q }) }))
  return resp
}
