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

  const handleClick = async () => {
    await axios.post("http://localhost:3000/api/transfer", {
      to: address,
      amount: amount,
    });
  };

  return (
    <>
      <div className="text-black">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Send</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Transfer solana</DialogTitle>
              <DialogDescription>
                Make changes to your profile here. Click save when you're done.
              </DialogDescription>
            </DialogHeader>
            <div className="text-black flex flex-col gap-5">
              <Label htmlFor="username" className="text-right">
                Wallet Address:
              </Label>
              <Input
                id="solanaAddress"
                // defaultValue="Type Here..."
                placeholder="Type Here..."
                className="col-span-3"
              />
            </div>
            <DialogFooter>
              {/* <Button type="submit">Send Solana</Button> */}
              <Button onClick={handleClick}>Send Solana</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}
