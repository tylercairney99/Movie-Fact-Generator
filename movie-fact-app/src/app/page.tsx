// HOMEPAGE DASHBOARD - Main app page at localhost:3000
// Shows user info and movie facts after authentication

'use client' // Required for NextAuth hooks
import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import MovieForm from '@/components/MovieForm'

export default function HomePage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  
  // State for movie facts from OpenAI API
  const [movieFact, setMovieFact] = useState<string>('')
  const [isLoadingFact, setIsLoadingFact] = useState(false)

  // Fetch movie fact
  const fetchMovieFact = async (movieName: string) => {
    try {
      setIsLoadingFact(true)
      const response = await fetch('/api/movie-fact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ movieName }),
      })
      
      if (!response.ok) throw new Error('Failed to fetch movie fact')
      
      const data = await response.json()
      setMovieFact(data.fact)
    } catch (error) {
      console.error('Error fetching movie fact:', error)
      setMovieFact('Unable to load movie fact. Please refresh to try again.')
    } finally {
      setIsLoadingFact(false)
    }
  }
  // Save user's favorite movie to database
  const handleMovieSubmit = async (movieName: string) => {
    try {
      const response = await fetch('/api/user/movie', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ movieName }),
      })
      
      if (!response.ok) throw new Error('Failed to save movie')
      
      window.location.reload()
    } catch (error) {
      console.error('Error saving movie:', error)
      alert('Failed to save movie. Please try again.')
    }
  }
  // Redirect to login if not authenticated
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login')
    }
  }, [status, router])
  
  // Fetch movie fact when user has favorite movie
  useEffect(() => {
    const favoriteMovie = (session?.user as { favoriteMovie?: string })?.favoriteMovie
    if (favoriteMovie && status === 'authenticated') {
      fetchMovieFact(favoriteMovie)
    }
  }, [session, status])
  
  // Show loading while checking authentication
  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    )
  }

  // Show redirect message while navigating to login
  if (status === 'unauthenticated') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Redirecting to login...</div>
      </div>
    )
  }

  // Main dashboard for authenticated users
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        
        {/* Header with user info and logout */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {/* User profile image from Google */}
              {session?.user?.image && (
                <Image
                  src={session.user.image}
                  alt="Profile"
                  width={64}
                  height={64}
                  className="w-16 h-16 rounded-full"
                />
              )}
              
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Welcome, {session?.user?.name}!
                </h1>
                <p className="text-gray-600">{session?.user?.email}</p>
              </div>
            </div>
            
            {/* Logout button */}
            <button
              onClick={() => signOut({ callbackUrl: '/login' })}
              className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Main content - movie form or facts display */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4 text-black">Movie Facts Dashboard</h2>
          
          {/* Show facts if user has favorite movie, otherwise show form */}
          {(session?.user as { favoriteMovie?: string })?.favoriteMovie ? (
            <div className="text-center py-8">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Your favorite movie: {(session?.user as { favoriteMovie?: string })?.favoriteMovie}
              </h3>
              
              {/* AI-generated movie fact section */}
              <div className="bg-blue-50 rounded-lg p-6 mt-6">
                <h4 className="text-md font-semibold text-blue-900 mb-3">
                  🎬 Fun Movie Fact
                </h4>
                {isLoadingFact ? (
                  <div className="text-blue-600">
                     Generating fun fact about {(session?.user as { favoriteMovie?: string })?.favoriteMovie}...
                  </div>
                ) : movieFact ? (
                  <div>
                    <p className="text-blue-800 leading-relaxed mb-3">
                      {movieFact}
                    </p>
                    <p className="text-sm text-blue-600">
                      Generated by OpenAI • Refresh for a new fact!
                    </p>
                  </div>
                ) : (
                  <p className="text-blue-600">
                    Preparing your movie fact...
                  </p>
                )}
              </div>
              
              <p className="text-sm text-gray-500 mt-4">
                 Refresh the page to get a brand new AI-generated fact!
              </p>
            </div>
          ) : (
            <div className="py-8">
              <div className="text-center mb-6">
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Welcome! What&apos;s your favorite movie?
                </h3>
                <p className="text-sm text-gray-600">
                  We&apos;ll show you interesting facts about it!
                </p>
              </div>
              <MovieForm onMovieSubmit={handleMovieSubmit} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
