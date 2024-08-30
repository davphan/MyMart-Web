'use client';

import { NavLink, PrimaryButton } from "@/libs/components/buttons";
import Footer from "@/libs/components/Footer";
import { FormInputText } from "@/libs/components/inputs";
import { loginWithCredentials } from "@/libs/util/actions";
import { wiggle } from "@/libs/util/animations";
import { LoginState } from "@/libs/util/definitions";
import { useState } from "react";
import { useFormState } from "react-dom";

/**
 * Login screen to login users.
 */
export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const initialState: LoginState = { message: null, errors: {} };
  const [formState, formAction] = useFormState(loginWithCredentials, initialState);

  /**
   * Checks if there are any form errors present, otherwise submits the form.
   * @param e Button click event.
   */
  function submitForm(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    // If errors are present, show animation on each active error and prevent
    // the form from submitting
    if (Object.keys(formState.errors).length) {
      const errorComponents: NodeListOf<Element> = document.querySelectorAll('.form-error');
      errorComponents.forEach((component) => {
        component.animate(wiggle, { duration: 300, iterations: 1 })
      })
    } else {
      e.currentTarget.form?.requestSubmit();
    }
  }

  return (
    <div className="h-full flex flex-col items-center">
      <form
        action={formAction}
        className='flex flex-col items-center my-auto rounded-lg bg-primary_card p-5 w-72'
      >
        <h1 className="font-bold text-lg mb-2">Login</h1>
        <FormInputText
          label='Username/Email'
          name='email'
          onChange={(e) => {
            setEmail(e.target.value);
            formState.errors = {};
          }}
        />
        <FormInputText
          label='Password'
          name='password'
          type='password'
          onChange={(e) => {
            setPassword(e.target.value);
            formState.errors = {};
          }}
        />
        {formState.errors.server &&
        <div className="flex flex-col justify-center items-center w-full">
          {formState.errors.server.map((msg: string) => (
            <p className="text-wrap form-error mt-2 text-sm text-red-500">{msg}</p>
          ))}
        </div>
        }
        <PrimaryButton className="m-3" onClick={e => submitForm(e)}>
          Log In
        </PrimaryButton>
        <p className="text-sm pt-5">Don't have an account yet?</p>
        <NavLink href='/signup' className="pb-5">Sign Up</NavLink>
        <NavLink href='/'>Go Home</NavLink>
      </form>
      <Footer />
    </div>
  );
}