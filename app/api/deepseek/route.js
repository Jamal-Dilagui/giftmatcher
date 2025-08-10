import { NextResponse } from 'next/server';
import OpenAI from 'openai';

export const runtime = 'edge'; // Use edge runtime for faster responses

const openai = new OpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: process.env.OPENROUTER_API_KEY,
  defaultHeaders: {
    'HTTP-Referer': process.env.SITE_URL || 'http://localhost:3000',
    'X-Title': process.env.SITE_NAME || 'Gift Matcher',
  },
});

export async function POST(request) {
  try {
    const { messages, model = 'openai/gpt-4o', max_tokens = 1000 } = await request.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: 'Messages array is required' },
        { status: 400 }
      );
    }

    const completion = await openai.chat.completions.create({
      model,
      messages,
      max_tokens,
      temperature: 0.7,
    });

    return NextResponse.json({
      response: completion.choices[0].message,
      usage: completion.usage,
    });

  } catch (error) {
    console.error('OpenRouter API error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to generate response' },
      { status: 500 }
    );
  }
}