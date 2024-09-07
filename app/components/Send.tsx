"use client";

import PropagateLoader from "react-spinners/PropagateLoader";
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
  // const [open, setOpen] = useState<boolean>(false);

  const [loading, setLoading] = useState<boolean>(false);
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SendBody>({ resolver: zodResolver(sendBody) });

  const onSubmit: SubmitHandler<SendBody> = async (data) => {
    setLoading(true);

    try {
      const response = await axios.post("/api/transfer?", {
        toAddress: data.toAddress,
        amount: data.amount,
      });

      setLoading(false);

      if (response.data.msg === "Transfer successful!") {
        reset();
        return toast({
          description: response.data.msg,
        });
      }
      return toast({
        variant: "destructive",
        description: response.data.msg,
      });
    } catch (errors: any) {
      return toast({
        variant: "destructive",
        description: errors.message,
      });
    }
  };

  return (
    <>
      {/* open={open} onOpenChange={setOpen} */}
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
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-3"
          >
            <Label htmlFor="username" className="">
              Wallet Address:
            </Label>
            <Input
              id="solanaAddress"
              placeholder="Enter Solana wallet address"
              {...register("toAddress")}
            />
            {errors.toAddress && (
              <div className="text-red-500 text-xs">
                {errors.toAddress.message}
              </div>
            )}
            <Label htmlFor="username" className="">
              Amount (SOL):
            </Label>
            <Input
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
                disabled={loading}
                type="submit"
                className="flex justify-center items-center w-full text-black bg-white"
              >
                {loading ? (
                  <PropagateLoader size={10} />
                ) : (
                  <div>Send Solana</div>
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
