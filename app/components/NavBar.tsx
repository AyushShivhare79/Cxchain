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
      <div className="flex justify-between items-center bg-black px-20 py-3">
        <div className="flex items-center justify-center gap-2 text-xl font-semibold">
          <WalletIcon />
          <div>Cxchain</div>
        </div>

        <Button
          className="bg-white text-black hover:bg-purple-100"
          onClick={user ? onSignout : onSignin}
        >
          {user ? <div>Logout</div> : <div>SignIn</div>}
        </Button>

        {/* {status === "authenticated" ? (
          <Button onClick={() => signOut({ callbackUrl: "/" })}>Logout</Button>
        ) : (
          <Button onClick={() => signIn("google")}>SignIn</Button>
        )} */}
      </div>
    </>
  );
}

export function WalletIcon() {
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 12a2.25 2.25 0 0 0-2.25-2.25H15a3 3 0 1 1-6 0H5.25A2.25 2.25 0 0 0 3 12m18 0v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 9m18 0V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v3"
        />
      </svg>
    </>
  );
}
