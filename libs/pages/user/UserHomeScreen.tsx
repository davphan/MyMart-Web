'use client';

import { getUserInfo, isLoggedIn } from "@/libs/auth/actions";
import { NavLink, PrimaryButton } from "@/libs/components/buttons";
import { ClientUser } from "@/libs/dao/AuthDAO";
import { useParams } from "next/navigation";
import { useState } from "react";

type Params = { username: string };

export default function UserHomeScreen() {
  const params = useParams<Params>();
  const [user, setUser] = useState<ClientUser | null>(null);

  return (
    <div className="flex flex-col items-center justify-center">
      <p className="mb-4 text-center font-bold">{`Username: ${params.username}`}</p>
      <PrimaryButton onClick={async () => {
        setUser(await getUserInfo());
        console.log(user);
      }}>
        Update User
      </PrimaryButton>
      <p>{user ? user.username : "update user ^"}</p>
      {/* <PrimaryButton onClick={async () => {console.log(await isLoggedIn())}}>Show JWT</PrimaryButton> */}
      <NavLink href="/">👈 Go to public home page</NavLink>
    </div>
  )
}
