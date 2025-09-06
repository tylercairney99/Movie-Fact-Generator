// API ENDPOINT - Save user's favorite movie to database
// POST /api/user/movie - Updates user's favoriteMovie field in Prisma

import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    // Get current user session from NextAuth
    const session = await getServerSession(authOptions)

    // Check if user is authenticated
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Not Authenticated' },
        { status: 401 }
      )
    }

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

    // Update user's favorite movie in database
    const updatedUser = await prisma.user.update({
      where: {
        email: session.user.email // Find user by email from session
      }, 
      data: {
        favoriteMovie: movieName.trim() // Save cleaned movie name
      }
    })

    // Return success response with saved movie
    return NextResponse.json({
      message: 'Movie saved successfully',
      movie: updatedUser.favoriteMovie
    })

  } catch (error) {
    console.error('Error saving movie:', error)
    return NextResponse.json(
      { error: 'Failed to save movie' },
      { status: 500 }
    )
  }
}