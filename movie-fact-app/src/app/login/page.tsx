// LOGIN PAGE - Sign in page at localhost:3000/login
// Uses NextAuth.js for Google OAuth authentication

'use client' // Required for NextAuth hooks and state management
import { signIn, getProviders } from "next-auth/react"
import { useEffect, useState } from "react"

// Define the type for the provider (google)
type Provider = {
  id: string;
  name: string;
  type: string;
  signinUrl: string;
  callbackUrl: string;
}

export default function LoginPage() {
  // State to store available auth providers (Google)
  const [providers, setProviders] = useState<Record<string, Provider> | null>(null)

  useEffect(() => {
    // Fetch providers from NextAuth (Google)
    const fetchProviders = async () => {
      const res = await getProviders() // Gets all configured providers from auth config
      setProviders(res)
    }
    fetchProviders()
  }, []) // Run once on component mount

// Show loading state while fetching providers
if (!providers) {
  return <div className="flex justify-center items-center min-h-screen">Loading...</div>
}

return (
  <div className = "min-h-screen flex items-center justify-center bg-gray-50">
    <div className = "max-w-md w-full space-y-8">
      {/* Header section with title and description */}
      <div>
        <h2 className = "mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
          Sign in to your account
          </h2>
          <p className = "mt-2 text-center text-sm text-gray-600">
            Welcome to Movie Facts App
          </p>
      </div>

      {/* Authentication buttons section */}
      <div className="mt-8 space-y-6">
          {/* Loop through providers and create buttons */}
          {Object.values(providers).map((provider) => (
            <div key={provider.name}>
              <button
                onClick={() => signIn(provider.id, { callbackUrl: '/' })}  // Trigger OAuth flow, redirect to homepage after login
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Sign in with {provider.name}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}