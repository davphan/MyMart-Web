'use server';

import { SignupState, LoginState, LoginSchema, SignupSchema } from "@/packages/util/definitions";
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

export async function loginWithCredentials(state: LoginState, formData: FormData) : Promise<LoginState> {
  // Validate login input
  const validatedFields = LoginSchema.safeParse({
    username: formData.get('username'),
    password: formData.get('password'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Invalid fields. Login failed.'
    }
  }

  const { username, password } = validatedFields.data;

  revalidatePath('/user');
  redirect(`/user/${username}`);
}

export async function signupWithCredentials(state: SignupState, formData: FormData) : Promise<SignupState> {
  // Validate sign up input
  const validatedFields = SignupSchema.safeParse({
    username: formData.get('inputUsername'),
    email: formData.get('inputEmail'),
    password: formData.get('inputPassword')
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors
    }
  }

  const { username, email, password } = validatedFields.data;

  console.log(`Username: ${username}\nEmail: ${email}\nPassword: ${password}`);

  revalidatePath('/user');
  redirect(`/user/${username}`);
}