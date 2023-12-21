import { objectKeys } from "./utils";

enum AppEnv {
	Production = "production",
	Staging = "staging",
	Development = "development",
}

interface Env {
	NEXT_PUBLIC_ALCHEMY_KEY: string;
	NEXT_PUBLIC_WALLETCONNECT_ID: string;
	NEXT_PUBLIC_APP_ENV: AppEnv;
	NEXT_PUBLIC_SERVER_BASE_URL: string;
	GITHUB_TOKEN: string;
	GITHUB_ID: string;
	GITHUB_SECRET: string;
	NEXTAUTH_URL: string;
	NEXTAUTH_SECRET: string;
}

const env: Env = {
	NEXT_PUBLIC_ALCHEMY_KEY: process.env.NEXT_PUBLIC_ALCHEMY_KEY as string,
	NEXT_PUBLIC_WALLETCONNECT_ID: process.env
		.NEXT_PUBLIC_WALLET_CONNECT_ID as string,
	NEXT_PUBLIC_APP_ENV: process.env.NEXT_PUBLIC_APP_ENV as AppEnv,
	NEXT_PUBLIC_SERVER_BASE_URL: process.env
		.NEXT_PUBLIC_SERVER_BASE_URL as string,
	GITHUB_TOKEN: process.env.GITHUB_TOKEN as string,
	GITHUB_ID: process.env.GITHUB_ID as string,
	GITHUB_SECRET: process.env.GITHUB_SECRET as string,
	NEXTAUTH_URL: process.env.NEXTAUTH_URL as string,
	NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET as string,
};

const frontendKeys = objectKeys(env).filter((key) =>
	key.includes("NEXT_PUBLIC"),
);
const serverKeys = objectKeys(env).filter((key) => !frontendKeys.includes(key));

let keysToValidate = frontendKeys;
if (typeof window === "undefined") {
	keysToValidate = serverKeys;
}

const missingKeys: Array<string> = [];

keysToValidate.forEach((key) => {
	if (!env[key]) {
		missingKeys.push(key);
	}
	if (key === "NEXT_PUBLIC_APP_ENV") {
		if (!Object.values(AppEnv).includes(env[key] as any)) {
			throw new Error(
				`${key} must be one of ${Object.values(AppEnv).join(", ")}`,
			);
		}
	}
});
if (missingKeys.length > 0) {
	throw new Error(`Missing environment variables: ${missingKeys.join(", ")}`);
}

export const isDev = () =>
	process.env.NODE_ENV === "development" &&
	env.NEXT_PUBLIC_APP_ENV === AppEnv.Development;
// prod here is considered to be any deployed environment (previews, staging, production, etc)
export const isProd = () =>
	process.env.NODE_ENV === "production" &&
	env.NEXT_PUBLIC_APP_ENV === AppEnv.Production;

export const isStaging = () =>
	process.env.NODE_ENV === "production" &&
	env.NEXT_PUBLIC_APP_ENV === AppEnv.Staging;

export default env;
