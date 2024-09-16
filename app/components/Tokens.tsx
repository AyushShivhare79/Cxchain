import { TokensTypes } from "./Card";

export default function Tokens({ tokens }: { tokens: TokensTypes[] }) {
  return (
    <>
      <div className="flex justify-center items-center flex-col gap-2 w-full ">
        <div className="flex bg-white text-black rounded-xl w-20 justify-center items-center">
          Tokens
        </div>
        <div className="flex flex-col w-full gap-4">
          {tokens.map((value, index) => {
            return (
              <div key={index} className="flex flex-col">
                <div className="flex justify-between items-center">
                  <div className="font-semibold">{value.name}</div>
                  <div className="font-semibold">${value.usdBalance}</div>
                </div>

                <div className="flex justify-between items-center">
                  <div className="text-gray-400 text-sm">
                    1 {value.name.toLowerCase()} = {value.price}
                  </div>
                  <div className="text-gray-400 text-sm">{value.balance}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
