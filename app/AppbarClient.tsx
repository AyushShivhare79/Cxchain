"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import NavBar from "./components/NavBar";

export default function () {
  const session = useSession();
  console.log("WORKING: ", session);
  return (
    <>
      <div className="relative z-10">
        <NavBar
          user={session.data?.user}
          onSignin={async () => {
            await signIn("google");
          }}
          onSignout={async () => {
            await signOut({ callbackUrl: "/" });
          }}
        />
      </div>
    </>
  );
}
