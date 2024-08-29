'use client';

import { NavLink } from "@/libs/components/buttons";

export default function UserHomeScreen({ username } : { username: string }) {
  return (
    <div className="flex flex-col items-center justify-center">
      <p className="mb-4 text-center font-bold">{`Username: ${username}`}</p>
      <NavLink href="/">👈 Go to public home page</NavLink>
    </div>
  )
}
