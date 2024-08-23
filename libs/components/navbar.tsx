'use client';

import Link from "next/link";
import { NavLink, PrimaryNavButton } from "./buttons";
import { useParams } from "next/navigation";

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
      <PrimaryNavButton href='/'>Sign Out</PrimaryNavButton>
      <div className='flex flex-row'>
        <Link href={`/user/${params.username}`} className='font-bold'>{params.username}</Link>
      </div>
    </div>
  );
}
