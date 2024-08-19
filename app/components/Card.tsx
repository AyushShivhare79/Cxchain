"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import axios from "axios";

import { ReactNode, useEffect, useState } from "react";
import { TokenDetails } from "../lib/tokens";

export default function ({ session }: { session: any }) {
  const [response, setResponse] = useState<ReactNode>();
  const [tokens, setTokens] = useState<TokenDetails[]>([]);
  const publicKey = session?.user?.publicKey;

  console.log(session);

  useEffect(() => {
    const getKey = async () => {
      const backData = await axios.get(
        `/api/token?address=${publicKey}`
      );
      setResponse(backData.data?.totalBalance);
      setTokens(backData.data?.tokens);
    };
    getKey();
  }, [publicKey]);

  return (
    <>
      <div className="flex justify-center items-center border border-white h-screen">
        <Card className="w-2/5">
          <CardHeader>
            <CardTitle>Welcome back, {session?.user?.name} </CardTitle>
          </CardHeader>
          <CardContent className="flex justify-between items-center">
            <div className="flex justify-center items-center font-semibold gap-2">
              <div className="text-5xl">${response}</div>
              <div className="text-3xl text-slate-500">USD</div>
            </div>
            <div>Your Wallet Address</div>
          </CardContent>
          <CardContent className="flex gap-5">
            <Button className="w-full">Send</Button>
            <Button className="w-full">Swap</Button>
          </CardContent>
          <CardFooter className="border border-black bg-slate-200 rounded-xl">
            <div className="w-full flex flex-col gap-2">
              <div>Tokens</div>

              <div className="border border-black flex flex-col gap-3">
                {tokens.map((value, index) => {
                  return (
                    <div
                      key={index}
                      className="border border-black flex justify-between"
                    >
                      <div>{value.name}</div>
                      <div>{value.price}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}
