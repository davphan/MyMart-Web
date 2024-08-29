'use server';

import NextAuth, { AuthError } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from './auth.config';
import { sql } from '@vercel/postgres';
import { LoginSchema, UserLoginInfoSchema } from '../util/definitions';
import { User } from 'next-auth';
import { saltAndHash } from '../util/passwords';
import { compareSync } from 'bcrypt-ts';

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

        // Validate username/email
        const validatedFields = LoginSchema.safeParse({
          email: credentials.email,
          password: credentials.password
        });

        // Validation error
        if (!validatedFields.success) {
          throw new Error("Invalid input fields. Sign in failed.");
        }
        const { email, password } = validatedFields.data;

        // Get user password
        const { rows } = await sql<UserLoginInfoSchema>`
          SELECT *
          FROM user_login_info
          WHERE username = ${email}
          OR email = ${email.toLowerCase()}
        `;

        // Check if user exists
        if (rows.length < 1) {
          throw new AuthError("User does not exist");
        }

        // Check if input password macthes user password
        const result = compareSync(password, rows[0].password);
        if (!result) {
          throw new AuthError("Incorect password")
        }
        const user: User = {
          id: rows[0].id,
          name: rows[0].username,
          image: rows[0].image
        };
        return user;
      }
    }),
  ],
});
