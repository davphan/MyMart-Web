import { z } from 'zod';

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

export const LoginSchema = z.object({
  username: z.string().trim(),
  password: z.string().trim()
})

export type SignupState = {
  errors?: {
    username?: string[];
    email?: string[];
    password?: string[];
  }
  message?: string | null;
};

export type LoginState = {
  errors?: {
    username?: string[];
    password?: string[];
  }
  message?: string | null;
}
