"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

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
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { sendBody, SendBody } from "../types/sendBody";

export default function () {
  // const [address, setAddress] = useState<string>();
  // const [amount, setAmount] = useState<string>();
  // const [click, setClick] = useState<boolean>(false);

  const [open, setOpen] = useState<boolean>(false);
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SendBody>({ resolver: zodResolver(sendBody) });

  const onSubmit: SubmitHandler<SendBody> = async (data) => {
    const response = await axios.post("/api/transfer", {
      to: data.address,
      amount: data.amount,
    });

    console.log(response);

    if (response.status === 200) {
      reset();
      return toast({
        description: "Transfer successful!",
      });
    }
    // return toast({
    //   variant: "destructive",
    //   description: "Transfer failed!",
    // });
  };

  // useEffect(() => {
  //   const handleClick = async () => {
  //     await axios.post("/api/transfer", {
  //       to: address,
  //       amount: amount,
  //     });
  //     setClick(false);
  //   };
  //   if (click === true) {
  //     handleClick();
  //   }
  // }, [click]);

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
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
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-3"
          >
            <Label htmlFor="username" className="">
              Wallet Address:
            </Label>
            <Input
              // onChange={(e: any) => setAddress(e.target.value)}
              id="solanaAddress"
              placeholder="Enter Solana wallet address"
              {...register("address")}
            />
            {errors.address && (
              <div className="text-red-500 text-xs">
                {errors.address.message}
              </div>
            )}
            <Label htmlFor="username" className="">
              Amount (SOL):
            </Label>
            <Input
              // onChange={(e: any) => setAmount(e.target.value)}
              type="number"
              autoComplete="off"
              id="amount"
              placeholder="0 SOL"
              {...register("amount", { valueAsNumber: false })}
            />
            {errors.amount && (
              <div className="text-red-500 text-xs">
                {errors.amount.message}
              </div>
            )}

            <DialogFooter>
              <Button
                type="submit"
                className="bg-white text-black w-full"
                // onClick={() => setClick(true)}
              >
                Send Solana
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
