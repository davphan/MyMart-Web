import { z } from 'zod';

/**
 * Schema definition for the sign up form.
 */
export const SignupSchema = z.object({
  username: z.string().trim(),
  email: z.string().email().trim(),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long'})
    .regex(/[a-z]/, { message: 'Password must contain at least one lowercase letter'})
    .regex(/[A-Z]/, { message: 'Password must contain at least one uppercase letter'})
    .regex(/[!@&*<>?]/, { message: 'Password must contain at least one of these special characters (!@&*<>?)'})
    .trim()
})

/**
 * Schema definition for the login form.
 */
export const LoginSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .trim(),
  password: z
    .string({ required_error: "Password is required" })
    .trim()
});

/**
 * Error and message to describe the state of a form.
 */
export interface FormState {
  errors: {}
  message: string | null;
}

/**
 * State specifically for the sign up form.
 */
export interface SignupState extends FormState {
  errors: {
    username?: string[];
    email?: string[];
    reemail?: string[];
    password?: string[];
    repassword?: string[];
  }
}

/**
 * State specifically for the login form.
 */
export interface LoginState extends FormState {
  errors: {
    email?: string[];
    password?: string[];
  }
}
