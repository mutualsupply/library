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

export function fuzzyFilter<T, K extends keyof T>(
  items: Array<T>,
  query: string,
  key: K
) {
  query = query.toLowerCase();
  return items.filter(function (item) {
    if (typeof item[key] === "string") {
      var itemLower = (item[key] as string).toLowerCase();

      var j = 0;
      for (var i = 0; i < itemLower.length; i++) {
        if (itemLower[i] === query[j]) {
          j++;
        }

        if (j === query.length) {
          return true;
        }
      }
    }

    return false;
  });
}

export function jsonify(anything: any) {
  return JSON.stringify(anything, null, 2);
}
