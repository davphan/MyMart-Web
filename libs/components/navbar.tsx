'use client';

import Link from "next/link";
import { NavLink, PrimaryButton, PrimaryNavButton } from "./buttons";
import { logout } from "../util/actions";
import { User } from "next-auth";

/**
 * Navbar that navigates to login/signup pages if not signed in, or user
 * information if signed in.
 * @param user Current signed in user.
 */
export function Navbar({ user } : { user: User | undefined }) {
  return (
    <div className='flex flex-row items-center justify-between w-screen h-14 px-5 border-solid border-b-2 border-gray-100'>
    { user ?
    <>
      <PrimaryButton onClick={async () => {await logout()}}>Log Out</PrimaryButton>
      <div className='flex flex-row'>
        <Link href={'/dashboard/'} className='font-bold'>{user.name}</Link>
      </div>
    </>
    :
    <>
      <Link href="/" className='font-bold'>MyMart</Link>
      <div className='flex flex-row'>
        <NavLink href='/login'>Login</NavLink>
        <PrimaryNavButton href='/signup'>Sign Up</PrimaryNavButton>
      </div>
    </>
    }
    </div>
  );
}
