import { clusterApiUrl, Connection } from "@solana/web3.js";
import axios from "axios";
import { SUPPORTED_TOKENS } from "./tokens";

let LAST_UPDATED: number | null = null;
let prices: {
  [key: string]: {
    price: string;
  };
} = {};

const TOKEN_PRICE_REFRESH_INTERVAL = 60 * 1000;
export const connection = new Connection(clusterApiUrl("devnet"));

export async function getSupportedTokens() {
  if (
    !LAST_UPDATED ||
    new Date().getTime() - LAST_UPDATED < TOKEN_PRICE_REFRESH_INTERVAL
  ) {
    try {
      // const token = SUPPORTED_TOKENS[0].mint
      const response = await axios.get(
        `https://api-v3.raydium.io/mint/price?mints=${SUPPORTED_TOKENS[0].mint}`
      );
      // prices = response.data.data;
      prices = response.data;
      LAST_UPDATED = new Date().getTime();
    } catch (e) {
      console.log(e);
    }
  }

  // Removed usdc for now
  return SUPPORTED_TOKENS.map((s) => ({
    ...s,
    // price: prices[s.name].price,
    // @ts-ignore
    price: prices.data.So11111111111111111111111111111111111111112,
  }));
}
