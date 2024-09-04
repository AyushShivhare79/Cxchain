"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { useEffect, useState } from "react";

export default function () {
  const [address, setAddress] = useState<string>();
  const [amount, setAmount] = useState<string>();
  const [click, setClick] = useState<boolean>(false);

  useEffect(() => {
    const handleClick = async () => {
      await axios.post("/api/transfer", {
        to: address,
        amount: amount,
      });
      setClick(false);
    };
    if (click === true) {
      handleClick();
    }
  }, [click]);

  return (
    <>
      <div className="w-full">
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-white text-black w-full">Send</Button>
          </DialogTrigger>
          <DialogContent className="bg-black sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Send to Solana Wallet Address</DialogTitle>
              <DialogDescription>
                Specify amount and the designated wallet address
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col gap-3">
              <Label htmlFor="username" className="">
                Wallet Address:
              </Label>
              <Input
                onChange={(e: any) => setAddress(e.target.value)}
                id="solanaAddress"
                placeholder="Enter Solana wallet address"
              />
              <Label htmlFor="username" className="">
                Amount (SOL):
              </Label>
              <Input
                onChange={(e: any) => setAmount(e.target.value)}
                autoComplete="off"
                id="amount"
                placeholder="0 SOL"
              />
            </div>
            <DialogFooter>
              <Button onClick={() => setClick(true)}>Send Solana</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}
