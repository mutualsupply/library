import { objectKeys } from "./utils";

export const isDev = () => process.env.NODE_ENV === "development";
// prod here is considered to be any deployed environment (previews, staging, production, etc)
export const isProd = () => process.env.NODE_ENV === "production";

interface Env {
  NEXT_PUBLIC_ALCHEMY_KEY: string;
  NEXT_PUBLIC_WALLETCONNECT_ID: string;
  GITHUB_TOKEN: string;
  GITHUB_ID: string;
  GITHUB_SECRET: string;
}

const env: Env = {
  NEXT_PUBLIC_ALCHEMY_KEY: process.env.NEXT_PUBLIC_ALCHEMY_KEY as string,
  NEXT_PUBLIC_WALLETCONNECT_ID: process.env
    .NEXT_PUBLIC_WALLET_CONNECT_ID as string,
  GITHUB_TOKEN: process.env.GITHUB_TOKEN as string,
  GITHUB_ID: process.env.GITHUB_ID as string,
  GITHUB_SECRET: process.env.GITHUB_SECRET as string,
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
  const missingKeys = [];
  if (!env[key]) {
    missingKeys.push(key);
  }

  if (missingKeys.length > 0) {
    throw new Error(`Missing environment variables: ${missingKeys.join(", ")}`);
  }
});

export default env;
