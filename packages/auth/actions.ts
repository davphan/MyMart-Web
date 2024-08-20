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
  console.log(`Username: ${username}\nPassword: ${password}`);

  revalidatePath('/user');
  redirect(`/user/${username}`);
}

export async function signupWithCredentials(state: SignupState, formData: FormData) : Promise<SignupState> {
  console.log(formData);
  // Validate sign up input
  const validatedFields = SignupSchema.safeParse({
    username: formData.get('username'),
    email: formData.get('email'),
    password: formData.get('password')
  });

  if (!validatedFields.success) {
    console.log(validatedFields.error.flatten().fieldErrors);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Invalid fields. Sign up failed.'
    }
  }

  const { username, email, password } = validatedFields.data;

  console.log(`Username: ${username}\nEmail: ${email}\nPassword: ${password}`);

  revalidatePath('/user');
  redirect(`/user/${username}`);
}