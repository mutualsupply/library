import { objectKeys } from "../helpers/arrays";

export const isDev = () => process.env.NODE_ENV === "development";
// prod here is considered to be any deployed environment (previews, staging, production, etc)
export const isProd = () => process.env.NODE_ENV === "production";

interface Env {
  NEXT_PUBLIC_ALCHEMY_KEY: string;
  NEXT_PUBLIC_WALLETCONNECT_ID: string;
  GITHUB_TOKEN: string;
}

const env: Env = {
  NEXT_PUBLIC_ALCHEMY_KEY: process.env.NEXT_PUBLIC_ALCHEMY_KEY as string,
  NEXT_PUBLIC_WALLETCONNECT_ID: process.env
    .NEXT_PUBLIC_WALLET_CONNECT_ID as string,
  GITHUB_TOKEN: process.env.GITHUB_TOKEN as string,
};

const frontendKeys = objectKeys(env).filter((key) =>
  key.includes("NEXT_PUBLIC")
);
const serverKeys = objectKeys(env).filter((key) => !frontendKeys.includes(key));

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
