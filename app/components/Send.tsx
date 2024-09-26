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
import axios from "axios";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { sendBody, SendBody } from "../types/sendBody";
import SendInputs from "./SendInputs";

export default function Send() {
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
        <DialogContent className="bg-black border-2 border-[#0d0428] sm:max-w-[425px]">
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
            <SendInputs
              id="solanaAddress"
              label="Wallet Address: "
              placeholder={"Enter Solana wallet address"}
              register={{ ...register("toAddress") }}
              errors={errors.toAddress}
            />
            <SendInputs
              id="amount"
              label="Amount (SOL): "
              placeholder={"0 sol"}
              register={{ ...register("amount") }}
              errors={errors.amount}
            />

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
