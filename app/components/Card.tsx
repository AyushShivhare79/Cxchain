"use client";

import HashLoader from "react-spinners/HashLoader";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import axios from "axios";
import { ReactNode, useEffect, useState } from "react";
import Tokens from "./Tokens";
import Send from "./Send";

export interface TokensTypes {
  name: string;
  mint: string;
  native: boolean;
  price: number;
  decimals: number;
  balance: number;
  usdBalance: number;
}

interface sessionType {
  user: {
    id: string;
    name: string;
    publicKey: string;
  };
}

export default function CustomCard({ session }: { session: sessionType }) {
  const [response, setResponse] = useState<ReactNode>();
  const [loading, setLoading] = useState<boolean>(true);
  const [tokens, setTokens] = useState<TokensTypes[]>([]);
  const [showCopiedMessage, setShowCopiedMessage] = useState<boolean>(false);

  const publicKey = session?.user?.publicKey;

  useEffect(() => {
    const getKey = async () => {
      try {
        const backData = await axios.get(`/api/token?address=${publicKey}`);
        setResponse(backData.data?.totalBalance);
        setTokens(backData.data?.tokens);
        setLoading(false);
      } catch (error) {
        return console.log(error);
      }
    };
    getKey();
  }, [publicKey]);

  const handleCopy = () => {
    navigator.clipboard.writeText(publicKey).then(() => {
      setShowCopiedMessage(true);
      setTimeout(() => {
        setShowCopiedMessage(false);
      }, 2000);
    });
  };

  return (
    <>
      <div className="flex justify-center items-center h-screen ">
        {loading ? (
          <HashLoader color="#ffffff" size={90} />
        ) : (
          <Card className="bg-gray-900 text-white w-full md:w-2/5 border-2 border-black rounded-2xl">
            <CardHeader>
              <CardTitle className="text-3xl">
                Welcome back, {(session?.user?.name).split(" ")[0]}
              </CardTitle>
            </CardHeader>
            <CardContent className="flex justify-between items-center">
              <div className="flex justify-center items-baseline font-semibold gap-2">
                <div className="text-2xl md:text-4xl">${response}</div>
                <div className="text-lg md:text-2xl text-slate-600">USD</div>
              </div>
              <div className="flex justify-center items-center gap-2">
                {publicKey.substring(0, 4)}...
                {publicKey.substring(publicKey.length - 4, publicKey.length)}
                <div className="cursor-pointer" onClick={handleCopy}>
                  {showCopiedMessage ? <TickIcon /> : <CopyIcon />}
                </div>
              </div>
            </CardContent>
            <CardContent className="flex gap-5">
              <Send />
            </CardContent>
            <CardFooter className="bg-[#151516] rounded-xl">
              <Tokens tokens={tokens} />
            </CardFooter>
          </Card>
        )}
      </div>
    </>
  );
}

export function CopyIcon() {
  return (
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
        d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184"
      />
    </svg>
  );
}

export function TickIcon() {
  return (
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
        d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
      />
    </svg>
  );
}
