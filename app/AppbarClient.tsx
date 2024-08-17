"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import NavBar from "./components/NavBar";

export default function () {
  const session = useSession();
  return (
    <>
      <div>
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
