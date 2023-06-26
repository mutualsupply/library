import { objectKeys } from "../helpers/arrays";

export const isDev = () => process.env.NODE_ENV === "development";
// prod here is considered to be any deployed environment (previews, staging, production, etc)
export const isProd = () => process.env.NODE_ENV === "production";

interface Env {
  NEXT_PUBLIC_ALCHEMY_KEY: string;
  NEXT_PUBLIC_WALLETCONNECT_ID: string;
  GITHUB_TOKEN: string;
  GITHUB_APP_ID: string;
  GITHUB_PRIVATE_KEY: string;
  GITHUB_CLIENT_SECRET: string;
}

const env: Env = {
  NEXT_PUBLIC_ALCHEMY_KEY: process.env.NEXT_PUBLIC_ALCHEMY_KEY as string,
  NEXT_PUBLIC_WALLETCONNECT_ID: process.env
    .NEXT_PUBLIC_WALLET_CONNECT_ID as string,
  GITHUB_TOKEN: process.env.GITHUB_TOKEN as string,
  GITHUB_APP_ID: process.env.GITHUB_APP_ID as string,
  GITHUB_PRIVATE_KEY: process.env.GITHUB_PRIVATE_KEY as string,
  GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET as string,
};

// the following keys are used to authenticate github using our Github App credentials
const prodOnlyKeys: Array<keyof typeof env> = [
  "GITHUB_APP_ID",
  "GITHUB_PRIVATE_KEY",
  "GITHUB_CLIENT_SECRET",
];

let requiredKeys: Array<keyof typeof env> = [];
if (isProd()) {
  requiredKeys = prodOnlyKeys;
} else {
  requiredKeys = objectKeys(env).filter(
    (key) => !prodOnlyKeys.includes(key as any)
  );
}

const frontendKeys = requiredKeys.filter((key) => key.includes("NEXT_PUBLIC"));
const serverKeys = requiredKeys.filter((key) => !frontendKeys.includes(key));

let keysToValidate = frontendKeys;
if (typeof window === "undefined") {
  keysToValidate = serverKeys;
}

keysToValidate.forEach((key) => {
  if (!env[key]) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
});

export default env;
