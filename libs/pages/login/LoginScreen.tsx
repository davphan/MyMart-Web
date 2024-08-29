'use client';

import { NavLink, PrimaryButton } from "@/libs/components/buttons";
import { FormInputText } from "@/libs/components/inputs";
import { loginWithCredentials } from "@/libs/util/actions";
import { LoginState } from "@/libs/util/definitions";
import { useFormState } from "react-dom";

/**
 * Login screen to login users.
 */
export default function LoginScreen() {
  const initialState: LoginState = { message: null, errors: {} };
  const [formState, formAction] = useFormState(loginWithCredentials, initialState);

  return (
    <div className='flex justify-center items-center'>
      <form action={formAction} className='flex flex-col items-center rounded-lg bg-primary_card p-5'>
        <h1 className="font-bold text-lg mb-2">Login</h1>
        <FormInputText
          label='Username/Email'
          name='email'
        />
        <FormInputText
          label='Password'
          name='password'
          type='password'
        />
        <PrimaryButton className="m-3" type="submit">
          Log In
        </PrimaryButton>
        <NavLink href='/'>Go Home</NavLink>
      </form>
    </div>
  );
}