export interface TokenDetails {
  name: string;
  mint: string;
  native: boolean;
  price: string;
  decimals: number;
}

export const SUPPORTED_TOKENS: TokenDetails[] = [
  {
    name: "SOL",
    mint: "So11111111111111111111111111111111111111112",
    native: true,
    price: "",
    decimals: 9,
  },
  {
    name: "USDT",
    mint: "Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB",
    native: false,
    price: "",
    decimals: 6,
  },
];
