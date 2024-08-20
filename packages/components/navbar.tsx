'use client';

import Link from "next/link";
import { NavLink, PrimaryNavButton } from "./buttons";

export function HomeNavbar() {
  return (
    <div className='flex flex-row items-center justify-between w-screen h-14 px-5 border-solid border-b-2 border-gray-100'>
      <div className='flex flex-row'>
        <Link href="/" className='font-bold'>MyMart</Link>
      </div>
      <div className='flex flex-row'>
        <NavLink href='/login'>Login</NavLink>
        <PrimaryNavButton href='/signup'>Sign Up</PrimaryNavButton>
      </div>
    </div>
  );
}

export function UserNavbar() {
  return (
    <div className='flex flex-row items-center justify-between w-screen h-14 px-5 border-solid border-b-2 border-gray-100'>
      <div className='flex flex-row'>
        <Link href="/" className='font-bold'>MyMart</Link>
      </div>
      <div className='flex flex-row'>
        <PrimaryNavButton href='/'>Sign Out</PrimaryNavButton>
      </div>
    </div>
  );
}
