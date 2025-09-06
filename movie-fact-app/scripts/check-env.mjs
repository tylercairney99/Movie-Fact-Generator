// AI GENERATED CODE TO CHECK ENVIRONMENT VARIABLES

// Environment check script with dotenv support
import { config } from 'dotenv';

// Load .env file
config();
const required = [
  'DATABASE_URL',
  'GOOGLE_CLIENT_ID',
  'GOOGLE_CLIENT_SECRET',
  'OPENAI_API_KEY',
  'NEXTAUTH_URL',
  'NEXTAUTH_SECRET',
];

console.log('🔍 Checking environment variables...\n');

let ok = true;
for (const k of required) {
  const present = !!process.env[k];
  console.log(`${present ? '✅' : '❌'} ${k} ${present ? 'OK' : 'MISSING'}`);
  if (!present) ok = false;
}

console.log(ok ? '\n✅ All environment variables are present!' : '\n❌ Some environment variables are missing!');
if (!ok) process.exit(1);
