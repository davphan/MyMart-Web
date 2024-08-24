'use client';

import Link from "next/link";
import { NavLink, PrimaryButton, PrimaryNavButton } from "./buttons";
import { useParams } from "next/navigation";
import { logOut } from "../auth/actions";

export function HomeNavbar() {
  return (
    <div className='flex flex-row items-center justify-between w-screen h-14 px-5 border-solid border-b-2 border-gray-100'>
      <Link href="/" className='font-bold'>MyMart</Link>
      <div className='flex flex-row'>
        <NavLink href='/login'>Login</NavLink>
        <PrimaryNavButton href='/signup'>Sign Up</PrimaryNavButton>
      </div>
    </div>
  );
}

export function UserNavbar() {
  const params: {username: string} = useParams();
  return (
    <div className='flex flex-row items-center justify-between w-screen h-14 px-5 border-solid border-b-2 border-gray-100'>
      <PrimaryButton onClick={() => {logOut()}}>Log Out</PrimaryButton>
      <div className='flex flex-row'>
        <Link href={`/user/${params.username}`} className='font-bold'>{params.username}</Link>
      </div>
    </div>
  );
}
