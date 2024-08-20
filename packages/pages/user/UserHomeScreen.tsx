'use client';

import { NavLink } from "@/packages/components/buttons";
import { useParams } from "next/navigation";

type Params = { username: string };

export default function UserHomeScreen() {
  const params = useParams<Params>();

  return (
    <div className="flex-1 items-center justify-center">
      <p className="mb-4 text-center font-bold">{`Username: ${params.username}`}</p>
      <NavLink href="/">👈 Sign Out</NavLink>
    </div>
  )
}
