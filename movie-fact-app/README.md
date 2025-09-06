# Movie Fact Generator

A full-stack web application that generates AI-powered interesting facts about your favorite movies using Google OAuth authentication, PostgreSQL database, and OpenAI's GPT-3.5-turbo API.

## Features

- **Google OAuth Authentication** - Secure sign-in with Google accounts
- **User Profile Display** - Shows name, email, and profile photo from Google
- **Favorite Movie Storage** - Collects and stores user's favorite movie in database
- **AI-Generated Movie Facts** - Uses OpenAI to generate unique, interesting movie trivia
- **Fresh Facts on Refresh** - Get a new AI-generated fact every time you refresh the page
- **Secure Logout** - Clean session management with redirect to login

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, NextAuth.js
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js with Google OAuth
- **AI Integration**: OpenAI GPT-3.5-turbo API

## Getting Started

### Prerequisites

- Node.js 18+ installed
- PostgreSQL database (local or cloud)
- Google Cloud Console account
- OpenAI API account

### 1. Clone and Install

```bash
git clone https://github.com/tylercairney99/Movie-Fact-Generator.git
cd Movie-Fact-Generator/movie-fact-app
npm install
```

### 2. Environment Setup

Create a `.env.local` file in the root directory:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/movie_fact_db"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-random-secret-key-here"

# Google OAuth (from Google Cloud Console)
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# OpenAI
OPENAI_API_KEY="your-openai-api-key"
```

### 3. Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable the Google Identity API (OAuth 2.0)
4. Go to **Credentials** → **Create Credentials** → **OAuth 2.0 Client ID**
5. Set application type to "Web application"
6. Add authorized redirect URI: `http://localhost:3000/api/auth/callback/google`
7. Copy Client ID and Client Secret to your `.env.local`

### 4. OpenAI API Setup

1. Visit [OpenAI Platform](https://platform.openai.com/)
2. Create an account and navigate to API keys
3. Generate a new API key
4. Add it to your `.env.local` file

### 5. Database Setup

```bash
# Generate Prisma client
npx prisma generate

# Push database schema (creates tables)
npx prisma db push

# Optional: View your database
npx prisma studio
```

### 6. Run the Application

```bash
npm run dev
```

Visit `http://localhost:3000` to see your app!

## How to Use

### First Time Users

1. **Visit the App** - Go to `http://localhost:3000`
2. **Login** - Click "Sign in with Google" and complete OAuth flow
3. **Enter Favorite Movie** - You'll be prompted to enter your favorite movie
4. **Enjoy Facts** - The app will generate and display an interesting fact about your movie

### Returning Users

1. **Login** - Sign in with the same Google account
2. **View Dashboard** - See your profile info and a fresh movie fact
3. **Refresh for New Facts** - Reload the page to get different AI-generated trivia
4. **Logout** - Use the logout button to securely end your session

## Project Structure

```
movie-fact-app/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── auth/[...nextauth]/     # NextAuth API routes
│   │   │   ├── movie-fact/             # OpenAI movie fact generation
│   │   │   └── user/movie/             # Save favorite movie
│   │   ├── login/                      # Login page
│   │   ├── layout.tsx                  # Root layout with providers
│   │   └── page.tsx                    # Main dashboard
│   ├── components/
│   │   ├── MovieForm.tsx               # Movie input form
│   │   └── providers.tsx               # NextAuth session provider
│   └── lib/
│       ├── auth.ts                     # NextAuth configuration
│       └── prisma.ts                   # Prisma client setup
├── prisma/
│   └── schema.prisma                   # Database schema
├── next.config.ts                      # Next.js configuration
└── package.json                        # Dependencies
```

## Key Features Explained

### Authentication Flow
- Uses NextAuth.js with Google OAuth provider
- Secure session management with JWT tokens
- Automatic redirect to login for unauthenticated users

### Database Design
- PostgreSQL with Prisma ORM
- NextAuth-compatible user schema
- Stores user profile and favorite movie

### AI Integration
- OpenAI GPT-3.5-turbo for movie fact generation
- Custom prompts for engaging, concise trivia
- Error handling for API failures

### Security Features
- Environment variable protection
- CSRF protection via NextAuth
- Secure cookie handling
- Input validation and sanitization

## Troubleshooting

### Common Issues

**"Database connection failed"**
- Check your `DATABASE_URL` in `.env.local`
- Ensure PostgreSQL is running
- Verify database exists and credentials are correct

**"Google OAuth not working"**
- Verify `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET`
- Check redirect URI in Google Cloud Console
- Ensure `NEXTAUTH_URL` matches your domain

**"OpenAI API errors"**
- Verify your `OPENAI_API_KEY` is valid
- Check your OpenAI account has available credits
- Ensure API key has proper permissions

**"Images not loading"**
- Google profile images should load automatically
- Check `next.config.ts` has correct image domains configured
- Ensure `lh3.googleusercontent.com` is in remotePatterns

## Development Notes

- Built with Next.js 15 App Router architecture
- Uses TypeScript for complete type safety
- Tailwind CSS for responsive styling
- Comprehensive error handling and loading states
- Well-commented code for maintainability and interview readiness
- Follows React best practices and modern patterns
- Implements proper security measures and input validation

## Deployment

For production deployment:

1. Update `NEXTAUTH_URL` to your production domain
2. Use production PostgreSQL database URL
3. Set all environment variables in your hosting platform
4. Update Google OAuth redirect URIs for production domain
5. Generate a secure `NEXTAUTH_SECRET` for production
6. Ensure OpenAI API key has sufficient credits and permissions

### Recommended Platforms:
- **Vercel** (recommended for Next.js apps)
- **Railway** or **Supabase** for PostgreSQL hosting
- **Heroku** for full-stack deployment

## License

This project is for educational/assessment purposes.

## About

Created by Tyler Cairney as part of a software engineering assessment. Demonstrates full-stack development skills including:
- Modern React/Next.js development
- Authentication and session management
- Database design and integration
- API development and third-party integrations
- TypeScript and modern JavaScript practices
