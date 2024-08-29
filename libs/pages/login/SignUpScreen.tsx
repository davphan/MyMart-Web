'use client';

import { NavLink, PrimaryButton } from "@/libs/components/buttons";
import { FormInputText } from "@/libs/components/inputs";
import { signupWithCredentials } from "@/libs/util/actions";
import { wiggle } from "@/libs/util/animations";
import { SignupState } from "@/libs/util/definitions";
import { useState } from "react";
import { useFormState } from "react-dom";

export default function SignUpScreen() {
  // Text input states
  const [email, setEmail] = useState('');
  const [reEmail, setReEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');

  // Form action and states
  let initialState: SignupState = { errors: {}, message: null };
  const [formState, formAction] = useFormState(signupWithCredentials, initialState)

  /**
   * Checks if the the re-email value is the same as the current email value.
   * @param val String to compare against current email.
   */
  function matchEmails(val: string) {
    setReEmail(val)
    if (email !== val) {
      formState.errors.reemail = ['Emails do not match.'];
    } else {
      delete formState.errors.reemail;
    }
  }

  /**
   * Checks if the the re-password value is the same as the current password value.
   * @param val String to compare against current password.
   */
  function matchPasswords(val: string) {
    setRePassword(val)
    if (password !== val) {
      formState.errors.repassword = ['Passwords do not match.']
    } else {
      delete formState.errors.repassword;
    }
  }

  /**
   * Checks if there are any form errors present, otherwise submits the form.
   * @param e Button click event.
   */
  function submitForm(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    // Ensure emails and passwords match up
    matchEmails(reEmail);
    matchPasswords(rePassword);

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
    <div className='flex justify-center items-center'>
      <form action={formAction} className='flex flex-col items-center rounded-lg bg-primary_card p-5'>
        <h1 className="font-bold text-lg">Sign Up</h1>
        <FormInputText
          label='Username'
          name='username'
          errors={formState.errors.username}
          onChange={e => delete formState.errors.username}
        />
        <FormInputText
          label='Email'
          name='email'
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            delete formState.errors.email;
            delete formState.errors.reemail;
          }}
          errors={formState.errors.email}
        />
        <FormInputText
          label='Re-Enter Email'
          value={reEmail}
          onChange={(e) => {
            matchEmails(e.target.value);
          }}
          errors={formState.errors.reemail}
        />
        <FormInputText
          label='Password'
          name='password'
          type='password'
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            delete formState.errors.password;
            delete formState.errors.repassword;
          }}
          errors={formState.errors.password}
        />
        <FormInputText
          label='Re-Enter Password'
          type='password'
          value={rePassword}
          onChange={e => matchPasswords(e.target.value)}
          errors={formState.errors.repassword}
        />
        {formState.errors.server &&
        <div className="flex flex-col justify-center items-center w-full">
          {formState.errors.server.map((msg: string) => (
            <p className="text-wrap form-error mt-2 text-sm text-red-500">{msg}</p>
          ))}
        </div>
        }
        <PrimaryButton className="m-3" onClick={e => submitForm(e)}>
          Sign Up
        </PrimaryButton>
        <NavLink href='/'>Go Home</NavLink>
      </form>
    </div>
  );
}