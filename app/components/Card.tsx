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
import Send from "./Send";

interface Tokens {
  name: string;
  mint: string;
  native: boolean;
  price: number;
  decimals: number;
  balance: number;
  usdBalance: number;
}
export default function ({ session }: { session: any }) {
  const [response, setResponse] = useState<ReactNode>();
  const [tokens, setTokens] = useState<Tokens[]>([]);
  const publicKey = session?.user?.publicKey;

  const [open, setOpen] = useState<boolean>(false);

  console.log("ClientSession: ", session);
  useEffect(() => {
    const getKey = async () => {
      const backData = await axios.get(`/api/token?address=${publicKey}`);
      setResponse(backData.data?.totalBalance);
      setTokens(backData.data?.tokens);
    };
    getKey();
  }, [publicKey]);

  return (
    <>
      <div className="flex justify-center items-center border border-white h-screen">
        {open ? (
          <Send />
        ) : (
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
              <Button onClick={() => setOpen(true)} className="w-full">
                Send
              </Button>
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
                        <div>
                          <div className="font-semibold">{value.name}</div>
                          <div className="text-gray-600 text-sm">
                            1 {value.name} = {value.price}
                          </div>
                        </div>

                        <div>
                          <div className="font-semibold">
                            ${value.usdBalance}
                          </div>
                          <div className="text-gray-600 text-sm">
                            {value.balance}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </CardFooter>
          </Card>
        )}
      </div>
    </>
  );
}
