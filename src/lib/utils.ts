import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Hex, getAddress } from "viem";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Returns typed object keys
 * @param obj
 */
export const objectKeys = <Obj>(obj: Obj): (keyof Obj)[] => {
  return Object.keys(obj as object) as (keyof Obj)[];
};

export function shortenAddress(address?: Hex, chars = 4): string {
  if (!address) {
    return "";
  }

  const parsed = getAddress(address);

  if (!parsed) {
    console.error(`Invalid 'address' parameter '${address}'.`);
    return "";
  }
  return `${parsed.substring(0, chars + 2)}...${parsed.substring(42 - chars)}`;
}

export const alphabet = "abcdefghijklmnopqrstuvwxyz"
  .split("")
  .map((char) => char.toUpperCase());
