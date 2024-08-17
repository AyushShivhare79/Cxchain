"use client";

import { Button } from "@/components/ui/button";
import { signIn, signOut, useSession } from "next-auth/react";

export default function ({
  user,
  onSignin,
  onSignout,
}: {
  user: any;
  onSignin: any;
  onSignout: any;
}) {
  const { data: session, status } = useSession();
  return (
    <>
      <div className="flex justify-between items-center px-20 py-3">
        <div className="text-2xl font-semibold">Cxchain</div>

        {status === "authenticated" ? (
          <Button onClick={() => signOut({ callbackUrl: "/" })}>Logout</Button>
        ) : (
          <Button onClick={() => signIn("google")}>SignIn</Button>
        )}
      </div>
    </>
  );
}
