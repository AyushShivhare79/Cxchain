import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function () {
  return (
    <>
      <div className="flex justify-center items-center border border-white h-screen">
        <Card className="w-2/5">
          <CardHeader>
            <CardTitle>Welcome back, </CardTitle>
          </CardHeader>
          <CardContent className="flex justify-between items-center">
            <div className="flex justify-center items-center font-semibold gap-2">
              <div className=" text-5xl">$0.00</div>
              <div className=" text-3xl text-slate-500">USD</div>
            </div>
            <div>Your wallet Address</div>
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
