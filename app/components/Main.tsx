import Image from "next/image";
import ring from "../../public/ring.png";
import { Button } from "@/components/ui/button";

export default function () {
  return (
    <>
      {/* <div></div> */}
      <div className="relative border border-black">
        <Image
          src={ring}
          width={500}
          height={500}
          alt="Picture of the author"
        />
        <div className="border border-black w-full flex flex-col justify-center items-center bottom-1/4 absolute gap-5">
          <h1 className="text-6xl">The Indian cryptocurrency Revolution</h1>
          <p className="text-xl">
            Create a frictionless wallet with just a Google Account.
          </p>
        </div>
        {/* <button
          type="button"
          className="text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2"
        >
          Signup with google
        </button> */}

      </div>
    </>
  );
}
