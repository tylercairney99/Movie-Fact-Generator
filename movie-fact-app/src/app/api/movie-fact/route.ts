// API ENDPOINT - Generate movie facts using OpenAI
// POST /api/movie-fact - Takes movie name and returns AI-generated fact

import { NextRequest, NextResponse } from 'next/server'
import { OpenAI } from 'openai'

// Initialize OpenAI client with API key from environment
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
})

export async function POST(request: NextRequest) {
  try {
    // Parse request body to get movie name
    const body = await request.json()
    const { movieName } = body

    // Validate movie name input
    if (!movieName || typeof movieName !== 'string' || !movieName.trim()) {
      return NextResponse.json(
        { error: 'Movie name is required' },
        { status: 400 } 
      )
    }

    console.log(`Generating a fun fact for movie: ${movieName}`)

    // Call OpenAI API to generate movie fact
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'user',
          content: `Tell me one interesting, fun, or surprising fact about the movie "${movieName.trim()}". 
          Keep it concise (2-3 sentences max) and make it engaging. Focus on behind-the-scenes details, box office records, 
          trivia, or cultural impact.`
        }
      ],
      max_tokens: 150, // Limit response length
      temperature: 0.8, // Add some creativity to responses
    })

    // Extract the generated fact from OpenAI response
    const fact = completion.choices[0]?.message?.content?.trim()

    // Check if fact was successfully generated
    if (!fact) {
      throw new Error('Failed to generate a movie fact')
    }

    console.log(`Generated fact: ${fact.substring(0, 50)}...`)
    
    // Return success response with the generated fact
    return NextResponse.json({
      fact: fact, // Fixed: was 'fun' instead of 'fact'
      movie: movieName.trim(),
      generatedAt: new Date().toISOString() // Fixed: proper date generation
    })

  } catch (error) {
    console.error('Error generating movie fact:', error)
    
    // Return error response
    return NextResponse.json(
      { error: 'Failed to generate movie fact' },
      { status: 500 }
    )
  }
}