import { TokensTypes } from "./Card";

export default function ({ tokens }: { tokens: TokensTypes[] }) {
  return (
    <>
      <div className="w-full flex justify-center items-center flex-col gap-2">
        <div className="flex bg-white text-black rounded-xl w-20 justify-center items-center">
          Tokens
        </div>
        <div className="w-full flex flex-col gap-3">
          {tokens.map((value, index) => {
            return (
              <div
                key={index}
                className="border border-black flex justify-between"
              >
                <div>
                  <div className="font-semibold">{value.name}</div>
                  <div className="text-gray-600 text-sm">
                    1 {value.name} = {value.price}
                  </div>
                </div>

                <div>
                  <div className="font-semibold">${value.usdBalance}</div>
                  <div className="text-gray-600 text-sm">{value.balance}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
