import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from './auth.config';
import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { LoginSchema } from '../util/definitions';
import { User } from 'next-auth';

// Sign in, sign out, and session data handled by Auth.js
export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        // TODO: verify user and return user data
        const { email, password } = await LoginSchema.parseAsync(credentials);
        const user: User = { id: '1', name: email };
        return user;
      }
    }),
  ],
});
