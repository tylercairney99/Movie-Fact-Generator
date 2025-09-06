import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as { 
  prisma: PrismaClient | undefined 
}

// Singleton pattern to prevent multiple Prisma instances in development
// This is important because Next.js hot reloads can create multiple connections
export const prisma = globalForPrisma.prisma ?? new PrismaClient({
  log: ['query'], // Enable query logging for debugging
});


if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}