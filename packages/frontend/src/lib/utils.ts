import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Hex, getAddress } from "viem";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const objectKeys = <Obj>(obj: Obj): (keyof Obj)[] => {
	return Object.keys(obj as object) as (keyof Obj)[];
};

export function shortenAddress(address?: Hex | string, chars = 4): string {
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

export function startsWithFilter<T, K extends keyof T>(
	items: Array<T>,
	query: string,
	key: K,
) {
	return items.filter((item) => {
		if (typeof item[key] === "string") {
			const itemLower = (item[key] as string).toLowerCase();
			return itemLower.startsWith(query.toLowerCase());
		}
		return false;
	});
}

export function jsonify(anything: any) {
	return JSON.stringify(anything, null, 2);
}

export function randomInclusive(max: number) {
	return Math.floor(Math.random() * (max + 1));
}

export default function sleep(sec: number) {
	return new Promise((resolve) => {
		setTimeout(resolve, sec * 1000);
	});
}
export function isExpired(epochSeconds: number) {
	return Date.now() / 1000 > epochSeconds;
}
