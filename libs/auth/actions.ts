'use server';

import { SignupState, LoginState, LoginSchema, SignupSchema } from "@/libs/util/definitions";
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import AuthDAO, { ClientUser } from "../dao/AuthDAO";
import FirebaseDAOimpl from "../dao/firebase/FirebaseDAO";
import { decrypt } from "./firebase/session";

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

  const user: ClientUser = await AuthDao.loginWithCredentials(email, password);
  revalidatePath('/dashboard');
  redirect(`/dashboard/${user.username}`);
}

export async function signupWithCredentials(state: SignupState, formData: FormData) : Promise<SignupState> {
  // Validate sign up input
  const validatedFields = SignupSchema.safeParse({
    username: formData.get('username'),
    email: formData.get('email'),
    password: formData.get('password')
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Invalid fields. Sign up failed.'
    }
  }

  const { username, email, password } = validatedFields.data;

  const user: ClientUser = await AuthDao.signupWithCredentials(username, email, password);
  revalidatePath('/dashboard');
  redirect(`/dashboard/${user.username}`);
}

export async function logOut() {
  await AuthDao.logOut();
  redirect('/');
}

export async function getUserInfo() {
  const user = AuthDao.currentUser
  console.log(user)
  return AuthDao.currentUser;
}

export async function isLoggedIn() {
  return AuthDao.currentUser ? true : false;
}
