'use server';

import { signIn, signOut } from '@/libs/auth/auth';
import { AuthError } from 'next-auth';
import { FormState, LoginSchema, LoginState, SignupSchema, SignupState } from './definitions';
import { sql } from '@vercel/postgres';
import { saltAndHash } from './passwords';

/**
 * Login using email and password credentials and redirect to the dashboard on
 * successful login.
 * @param prevState State of the client's form.
 * @param formData Data sent in the form.
 * @returns New state of client form.
 */
export async function loginWithCredentials(
  prevState: FormState,
  formData: FormData,
) : Promise<LoginState> {
  try {
    // Validate login input server side
    const validatedFields = LoginSchema.safeParse({
      email: formData.get('email'),
      password: formData.get('password'),
    });

    // Return data validation errors
    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: "Invalid fields given. Login failed."
      }
    }

    // Try signing in the current user
    const { email, password } = validatedFields.data;
    await signIn('credentials', {
      email: email,
      password: password,
      redirectTo: "/dashboard"
    });

    return {
      errors: {},
      message: 'Successfully authenticated'
    };
  } catch (error) {
    if (error instanceof AuthError) {
      return {
        errors:{
          server: ["Username or password incorrect"]
        },
        message: error.message
      };
    }
    throw error;
  }
}

/**
 * Sign up using username, email, and password credentials, sign in, and
 * automatically redirect to the dashboard.
 * @param prevState State of the client's form.
 * @param formData Data sent in the form.
 * @returns New state of client form.
 */
export async function signupWithCredentials(
  prevState: FormState,
  formData: FormData
) : Promise<SignupState> {
  try {
    // Validate login input server side
    const validatedFields = SignupSchema.safeParse({
      username: formData.get('username'),
      email: formData.get('email'),
      password: formData.get('password'),
    });

    // Return data validation errors
    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: "Invalid fields given. Signup failed."
      }
    }

    // TODO: save user data into database
    const { username, email, password } = validatedFields.data;
    const hashedPassword = saltAndHash(password)
    await sql`
      INSERT INTO user_login_info (username, email, password)
      VALUES (${username}, ${email.toLowerCase()}, ${hashedPassword});
    `;

    // Try signing in the current user
    await signIn('credentials', {
      email: email,
      password: password,
      redirectTo: "/dashboard"
    });

    return {
      errors: {},
      message: 'Successfully authenticated'
    };
  } catch (error) {
    if (error instanceof AuthError) {
      return {
        errors:{
          server: ['Login after sign up failed, please try to login again'],
        },
        message: error.message
      };
    }
    throw error;
  }
}

/**
 * Log out the current user and return to the home screen.
 */
export async function logout() {
  await signOut({ redirectTo: '/'});
}