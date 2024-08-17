"use client";

import { Button } from "@/components/ui/button";
import { signIn, signOut, useSession } from "next-auth/react";

export default function () {
  const { data: session, status } = useSession();

  // if(){

  // }

  return (
    <>
      <div className="flex justify-between items-center px-20 py-3">
        <div>Cxchain</div>

        {status === "authenticated" ? (
          <Button onClick={() => signOut({ callbackUrl: "/" })}>Logout</Button>
        ) : (
          <Button onClick={() => signIn("google")}>SignIn</Button>
        )}
      </div>
    </>
  );
}
