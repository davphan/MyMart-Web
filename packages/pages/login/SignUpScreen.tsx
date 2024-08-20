'use client';

import { signupWithCredentials } from "@/packages/auth/actions";
import { NavLink, PrimaryButton } from "@/packages/components/buttons";
import { FormInputText } from "@/packages/components/inputs";
import { SignupState } from "@/packages/util/definitions";
import { useState } from "react";
import { useFormState } from "react-dom";
// import { signupWithCredentials as signupWithCredentialsAction} from "../auth/actions";

export default function SignUpScreen() {
  const [email, setEmail] = useState('');
  const [reEmail, setReEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');

  let initialState: SignupState = {};
  const [formState, formAction] = useFormState(signupWithCredentials, initialState)

  // async function signupWithCredentials() {
  //   if (email !== reEmail) {
  //     if (!state.errors) {
  //       state.errors = {};
  //     }
  //     state.errors.email = ["Emails do not match"];
  //   }
  //   if (password !== rePassword) {
  //     if (!state.errors) {
  //       state.errors = {};
  //     }
  //     state.errors.password = ["Passwords do not match"];
  //   }

  //   if (state.errors) {
  //     state = {};
  //   }

  //   state = await signupWithCredentialsAction(username, email, password);
  // }

  return (
    <div className='flex justify-center items-center'>
      <form action={formAction} className='flex flex-col items-center rounded-lg bg-primary_card p-5'>
        <h1 className="font-bold text-lg">Sign Up</h1>
        <FormInputText
          label='Username'
          name='username'
        />
        <FormInputText
          label='Email'
          name='email'
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <FormInputText
          label='Re-Enter Email'
          name='reemail'
          value={reEmail}
          onChange={e => setReEmail(e.target.value)}
        />
        <FormInputText
          label='Password'
          name='password'
          type='password'
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <FormInputText
          label='Re-Enter Password'
          name='repassword'
          type='password'
          value={rePassword}
          onChange={e => setRePassword(e.target.value)}
        />
        <PrimaryButton className="m-3" type="submit">
          Sign Up
        </PrimaryButton>
        <NavLink href='/'>Go Home</NavLink>
      </form>
    </div>
  );
}