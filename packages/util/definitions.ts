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

export interface FormState {
  errors: {}
  message: string | null;
}

export interface SignupState extends FormState {
  errors: {
    username?: string[];
    email?: string[];
    reemail?: string[];
    password?: string[];
    repassword?: string[];
  }
}

export interface LoginState extends FormState {
  errors: {
    username?: string[];
    password?: string[];
  }
}
