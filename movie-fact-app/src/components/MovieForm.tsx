// MOVIE FORM COMPONENT - Input form for user's favorite movie
// Collects movie title and saves to database via parent component

'use client'
import { useState } from 'react'

type MovieFormProps = {
  onMovieSubmit: (movieName: string) => void // Callback function from parent
}

export default function MovieForm({ onMovieSubmit }: MovieFormProps) {
  const [movieName, setMovieName] = useState('') // Form input state
  const [isSubmitting, setIsSubmitting] = useState(false) // Loading state

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault() // Prevent default form submission
    
    // Validate input
    if (!movieName.trim()) {
      alert('Please enter a movie name')
      return
    }
    
    try {
      setIsSubmitting(true)
      await onMovieSubmit(movieName.trim()) // Call parent function to save movie
      setMovieName('') // Clear form on success
    } catch (error) {
      console.error('Error submitting movie:', error)
      alert('Failed to save movie. Please try again.')
    } finally {
      setIsSubmitting(false) // Re-enable form regardless of outcome
    }
  }

  return (
    <div className="max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Movie input field */}
        <div>
          <label htmlFor="movie" className="block text-sm font-medium text-gray-700 mb-2">
            What&apos;s your favorite movie?
          </label>
          <input
            type="text"
            id="movie"
            value={movieName}
            onChange={(e) => setMovieName(e.target.value)} // Update state on input change
            placeholder="Enter movie title..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            disabled={isSubmitting} // Disable during submission
          />
        </div>
        
        {/* Submit button with loading state */}
        <button
          type="submit"
          disabled={isSubmitting || !movieName.trim()} // Disable if submitting or empty
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Saving...' : 'Save My Favorite Movie'}
        </button>
      </form>
    </div>
  )
}