'use client';

import { signupWithCredentials } from "@/libs/auth/actions";
import { NavLink, PrimaryButton } from "@/libs/components/buttons";
import { FormInputText } from "@/libs/components/inputs";
import { wiggle, wiggle2 } from "@/libs/util/animations";
import { SignupState } from "@/libs/util/definitions";
import { useState } from "react";
import { useFormState } from "react-dom";
// import { signupWithCredentials as signupWithCredentialsAction} from "../auth/actions";

export default function SignUpScreen() {
  const [email, setEmail] = useState('');
  const [reEmail, setReEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');

  let initialState: SignupState = { errors: {}, message: null };
  const [formState, formAction] = useFormState(signupWithCredentials, initialState)

  function matchEmails(val: string) {
    setReEmail(val)
    if (email !== val) {
      formState.errors.reemail = ['Emails do not match.'];
    } else {
      delete formState.errors.reemail;
    }
  }

  function matchPasswords(val: string) {
    setRePassword(val)
    if (password !== val) {
      formState.errors.repassword = ['Passwords do not match.']
    } else {
      delete formState.errors.repassword;
    }
  }

  function submitForm(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    matchEmails(reEmail);
    matchPasswords(rePassword);
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
        <PrimaryButton className="m-3" onClick={e => submitForm(e)}>
          Sign Up
        </PrimaryButton>
        <NavLink href='/'>Go Home</NavLink>
      </form>
    </div>
  );
}