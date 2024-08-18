import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import axios from "axios";
import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import authOptions from "../lib/auth";

export default async function () {
  // const session = useSession()
  const session = await getServerSession(authOptions);

  const publicKey = session?.user?.publicKey;
  console.log("THis is the key: ", publicKey);

  const response = await axios.get(
    `http://localhost:3000/api/token?address=${publicKey}`
  );

  console.log("Ahhh shit here we go again: ", response);

  return (
    <>
      <div className="flex justify-center items-center border border-white h-screen">
        <Card className="w-2/5">
          <CardHeader>
            <CardTitle>Welcome back, </CardTitle>
          </CardHeader>
          <CardContent className="flex justify-between items-center">
            <div className="flex justify-center items-center font-semibold gap-2">
              <div className=" text-5xl">${response.data?.totalBalance}</div>
              <div className=" text-3xl text-slate-500">USD</div>
            </div>
            <div>Your Wallet Address</div>
          </CardContent>
          <CardContent className="flex gap-5">
            <Button className="w-full">Send</Button>
            <Button className="w-full">Swap</Button>
          </CardContent>
          <CardFooter className="bg-slate-200 rounded-xl">
            <div>Tokens</div>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}
