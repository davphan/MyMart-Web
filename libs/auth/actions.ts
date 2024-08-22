'use server';

import { SignupState, LoginState, LoginSchema, SignupSchema } from "@/libs/util/definitions";
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import AuthDAO, { User } from "../dao/AuthDAO";
import FirebaseDAOimpl from "../dao/firebase/FirebaseDAO";

const AuthDao: AuthDAO = new FirebaseDAOimpl();

/**
 * Validates and logs in using user credentials (username/email and password)
 * @param state Form state
 * @param formData Form Data
 * @returns New form state
 */
export async function loginWithCredentials(state: LoginState, formData: FormData) : Promise<LoginState> {
  // Validate login input
  const validatedFields = LoginSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Invalid fields. Login failed.'
    }
  }

  const { email, password } = validatedFields.data;
  console.log(`Email: ${email}\nPassword: ${password}`);

  try {
    const user: User = await AuthDao.loginWithCredentials(email, password);
    revalidatePath('/user');
    redirect(`/user/${user.username}`);
  } catch (error) {
    console.error("Sign in failed.", error);
    throw error;
  }

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

  try {
    const user: User = await AuthDao.signupWithCredentials(username, email, password);
    revalidatePath('/user');
    redirect(`/user/${user.username}`);
  } catch (error) {
    console.error("Sign in failed.", error);
    throw error;
  }
}
