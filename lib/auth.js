import GoogleProvider from 'next-auth/providers/google';
import GitHubProvider from 'next-auth/providers/github';
import { MongoDBAdapter } from '@auth/mongodb-adapter';
import clientPromise from './mongodb-adapter';

export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET || 'fallback-secret-for-development-only-change-in-production',
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || 'placeholder',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || 'placeholder',
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID || 'placeholder',
      clientSecret: process.env.GITHUB_CLIENT_SECRET || 'placeholder',
    }),
  ],
  // Only use MongoDB adapter if URI is configured
  adapter: process.env.MONGODB_URI ? MongoDBAdapter(clientPromise) : undefined,
  callbacks: {
    async session({ session, user }) {
      if (session?.user) {
        session.user.id = user?.id;
      }
      return session;
    },
  },
  pages: {
    signIn: '/auth/signin',
  },
  session: {
    // Use JWT strategy during build/when DB is not available
    strategy: process.env.MONGODB_URI ? 'database' : 'jwt',
  },
};

