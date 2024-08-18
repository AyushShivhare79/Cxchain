import solana from "../../public/solanaLogoMark.png";
import usdc from "../../public/usd-coin-usdc-logo.png";
import usdt from "../../public/tether-usdt-logo.png";

export interface TokenDetails {
  name: string;
  mint: string;
  native: boolean;
  price: string;
  image: object;
  decimals: number;
}
console.log("This is the type: ", typeof solana);
export const SUPPORTED_TOKENS: TokenDetails[] = [
  {
    name: "SOL",
    mint: "So11111111111111111111111111111111111111112",
    native: true,
    price: "",
    image: solana,
    decimals: 9,
  },
  {
    name: "USDC",
    mint: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
    native: false,
    price: "",
    image: usdc,
    decimals: 6,
  },
  {
    name: "USDT",
    mint: "Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB",
    native: false,
    price: "",
    image: usdt,
    decimals: 6,
  },
];
