'use client';

import { NavLink, PrimaryButton } from "@/libs/components/buttons";
import { useParams } from "next/navigation";
import { auth } from "@/libs/auth/firebase/config";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";

type Params = { username: string };

export default function UserHomeScreen() {
  const params = useParams<Params>();
  const [jwt, setJwt] = useState('Click da button...');

  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log(user);
    } else {
      console.log("No user");
    }
  });

  async function showJWT() {
    console.log(auth);
    if (auth.currentUser) {
      const token = await auth.currentUser.getIdToken()
      setJwt(token);
    } else {
      setJwt("Not signed in");
    }
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <p className="mb-4 text-center font-bold">{`Username: ${params.username}`}</p>
      <PrimaryButton onClick={async () => await showJWT()}>Show JWT</PrimaryButton>
      <p>{jwt}</p>
      <NavLink href="/">👈 Sign Out</NavLink>
    </div>
  )
}
