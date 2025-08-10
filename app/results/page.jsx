'use client'
import React, { useEffect, useState, useMemo } from 'react'
import Link from 'next/link'
import Image from 'next/image'

// Image component with fallback for broken/blocked images
const ImageWithFallback = ({ src, alt, fallback }) => {
  const [imageError, setImageError] = useState(false)
  const [imageLoading, setImageLoading] = useState(true)

  if (imageError) {
    return fallback
  }

  return (
    <>
      {imageLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-500"></div>
        </div>
      )}
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        onError={() => setImageError(true)}
        onLoad={() => setImageLoading(false)}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
    </>
  )
}

const ResultsPage = () => {
  const [suggestions, setSuggestions] = useState([])
  const [answers, setAnswers] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [amazonMap, setAmazonMap] = useState({}) // title -> { url, image, price }
  const [savingGift, setSavingGift] = useState(null)

  useEffect(() => {
    try {
      const raw = typeof window !== 'undefined' ? localStorage.getItem('giftSuggestions') : null
      const rawAnswers = typeof window !== 'undefined' ? localStorage.getItem('quizAnswers') : null
      const parsed = raw ? JSON.parse(raw) : []
      const parsedAnswers = rawAnswers ? JSON.parse(rawAnswers) : null
      setSuggestions(Array.isArray(parsed) ? parsed : [])
      setAnswers(parsedAnswers)
    } catch (e) {
      setSuggestions([])
    } finally {
      setLoading(false)
    }
  }, [])

  const titlesToFetch = useMemo(() => suggestions.slice(0, 8).map(g => g.title).filter(Boolean), [suggestions])

  useEffect(() => {
    const fetchAmazonForTitles = async () => {
      if (!titlesToFetch.length) return
      try {
        const results = await Promise.all(
          titlesToFetch.map(async (t) => {
            try {
              const res = await fetch('/api/amazon', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ query: t })
              })
              if (!res.ok) throw new Error('amazon fetch failed')
              const data = await res.json()
              console.log('Amazon API response for', t, ':', data) // Debug log
              const top = Array.isArray(data.items) && data.items.length ? data.items[0] : null
              return [t, top || { url: data.affiliateSearchLink, image: null, price: null }]
            } catch (err) {
              console.log('Amazon fetch error for', t, ':', err) // Debug log
              return [t, null]
            }
          })
        )
        const map = Object.fromEntries(results)
        console.log('Final amazonMap:', map) // Debug log
        setAmazonMap(map)
      } catch (e) {
        console.log('Overall Amazon fetch error:', e) // Debug log
      }
    }
    fetchAmazonForTitles()
  }, [titlesToFetch])

  const handleSaveGift = async (gift) => {
    setSavingGift(gift.title);
    try {
      const amazon = amazonMap[gift.title];
      const response = await fetch('/api/save-gift', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: gift.title,
          description: gift.why || '',
          image: amazon?.image || '',
          price: amazon?.price || gift.priceRange || '',
          category: gift.category || 'General',
          amazonUrl: amazon?.url || ''
        })
      });

      if (response.ok) {
        alert('Gift saved to your profile! 🎉');
      } else {
        const data = await response.json();
        if (data.error === 'Gift already saved') {
          alert('This gift is already saved to your profile!');
        } else {
          alert('Failed to save gift. Please try again.');
        }
      }
    } catch (error) {
      console.error('Error saving gift:', error);
      alert('Failed to save gift. Please try again.');
    } finally {
      setSavingGift(null);
    }
  };

  if (loading) {
    return (
      <main className="flex-1 flex items-center justify-center min-h-[60vh]">
        <div className="text-gray-600 dark:text-gray-300">Loading your matches…</div>
      </main>
    )
  }

  if (!suggestions.length) {
    return (
      <main className="flex-1 flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
        <h1 className="text-3xl md:text-4xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-yellow-500 to-blue-500">No matches yet</h1>
        <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-xl">Take the quiz to get personalized gift ideas tailored to your answers.</p>
        <Link href="/quiz" className="bg-gradient-to-r from-pink-500 to-red-500 text-white px-8 py-3 rounded-full font-bold shadow-2xl hover:shadow-pink-500/25 transform hover:scale-105 transition-all duration-300">
          Start the Quiz
        </Link>
      </main>
    )
  }

  return (
    <div>
      {/* Confetti Background */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="w-full h-full flex flex-wrap justify-center items-start gap-2 opacity-60">
          <span className="w-3 h-3 bg-pink-400 rounded-full inline-block animate-bounce"></span>
          <span className="w-2 h-2 bg-yellow-400 rounded-full inline-block animate-ping"></span>
          <span className="w-2.5 h-2.5 bg-blue-400 rounded-full inline-block animate-bounce delay-200"></span>
          <span className="w-2 h-2 bg-purple-400 rounded-full inline-block animate-ping delay-100"></span>
          <span className="w-3 h-3 bg-green-400 rounded-full inline-block animate-bounce delay-300"></span>
          <span className="w-2 h-2 bg-pink-400 rounded-full inline-block animate-ping delay-150"></span>
          <span className="w-2.5 h-2.5 bg-yellow-400 rounded-full inline-block animate-bounce delay-400"></span>
          <span className="w-2 h-2 bg-blue-400 rounded-full inline-block animate-ping delay-200"></span>
        </div>
      </div>

      {/* Results Section */}
      <main className="flex-1 flex flex-col items-center py-16 px-4 relative z-10">
        <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-10 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-yellow-500 to-blue-500 drop-shadow-lg">
          🎉 Your Perfect Matches
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 w-full max-w-6xl mb-12">
          {suggestions.map((s, idx) => {
            const amazon = s.title ? amazonMap[s.title] : null
            const img = s.image || amazon?.image
            const buyUrl = amazon?.url
            return (
              <div key={idx} className="relative bg-gradient-to-br from-pink-100 via-white to-pink-50 dark:from-gray-800 dark:via-gray-800 dark:to-gray-900 rounded-3xl shadow-2xl overflow-hidden flex flex-col border-4 border-pink-200 dark:border-pink-700">
                <div className="absolute top-4 right-4 flex items-center gap-2">
                  <span className="bg-pink-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow">AI Pick</span>
                </div>
                <div className="h-40 w-full flex items-center justify-center bg-pink-50 dark:bg-pink-900 overflow-hidden relative">
                  {img ? (
                    <ImageWithFallback 
                      src={img} 
                      alt={s.title || 'Gift'} 
                      fallback={<span className="text-5xl">🎁</span>}
                    />
                  ) : (
                    <span className="text-5xl">🎁</span>
                  )}
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <h2 className="font-bold text-lg mb-1 text-pink-700 dark:text-pink-200">{s.title || 'Suggested Gift'}</h2>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {s.category && (
                      <span className="inline-block bg-pink-100 dark:bg-pink-800 text-pink-600 dark:text-pink-200 text-xs font-bold px-2 py-1 rounded">{s.category}</span>
                    )}
                    {s.priceRange && (
                      <span className="inline-block bg-yellow-100 dark:bg-yellow-800 text-yellow-700 dark:text-yellow-200 text-xs font-bold px-2 py-1 rounded">{s.priceRange}</span>
                    )}
                  </div>
                  {s.why && (
                    <p className="text-gray-700 dark:text-gray-200 mb-4 flex-1">{s.why}</p>
                  )}
                  <div className="mt-auto flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      {buyUrl ? (
                        <a href={buyUrl} target="_blank" rel="noopener noreferrer" className="inline-block px-4 py-2 bg-pink-500 text-white rounded-xl font-bold shadow hover:bg-pink-600 transition flex items-center gap-2 flex-1 justify-center">
                          <span>Buy on Amazon</span>
                          <span className="text-lg">🔗</span>
                        </a>
                      ) : (
                        <a href={`/api/amazon?q=${encodeURIComponent(s.title || '')}`} target="_blank" rel="noopener noreferrer" className="inline-block px-4 py-2 bg-gray-700 text-white rounded-xl font-bold shadow hover:bg-gray-800 transition flex items-center gap-2 flex-1 justify-center">
                          <span>Search on Amazon</span>
                          <span className="text-lg">🔎</span>
                        </a>
                      )}
                    </div>
                    <button 
                      onClick={() => handleSaveGift(s)}
                      disabled={savingGift === s.title}
                      className="inline-block px-4 py-2 bg-blue-500 text-white rounded-xl font-bold shadow hover:bg-blue-600 transition flex items-center gap-2 justify-center disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {savingGift === s.title ? (
                        <>
                          <span className="animate-spin">🌀</span>
                          <span>Saving...</span>
                        </>
                      ) : (
                        <>
                          <span>Save to Profile</span>
                          <span className="text-lg">💾</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

                            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
                      <Link href="/quiz" className="bg-gradient-to-r from-pink-500 to-red-500 text-white px-10 py-4 rounded-full text-xl font-bold shadow-2xl hover:shadow-pink-500/25 transform hover:scale-105 transition-all duration-300">
                        🔁 Try Again
                      </Link>
                      <Link href="/profile" className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-10 py-4 rounded-full text-xl font-bold shadow-2xl hover:shadow-blue-500/25 transform hover:scale-105 transition-all duration-300">
                        💾 View Profile
                      </Link>
                    </div>
      </main>
    </div>
  )
}

export default ResultsPage