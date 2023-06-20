import { objectKeys } from "../helpers/arrays";

export const isDev = () => process.env.NODE_ENV === "development";
// prod here is considered to be any deployed environment (previews, staging, production, etc)
export const isProd = () => process.env.NODE_ENV === "production";

interface Env {
  alchemyKey: string;
  walletConnectId: string;
  githubToken: string;
  githubAppId: string;
  githubPrivateKey: string;
  githubClientSecret: string;
}

const env: Env = {
  alchemyKey: process.env.NEXT_PUBLIC_ALCHEMY_KEY as string,
  walletConnectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_ID as string,
  githubToken: process.env.GITHUB_TOKEN as string,
  githubAppId: process.env.GITHUB_APP_ID as string,
  githubPrivateKey: process.env.GITHUB_PRIVATE_KEY as string,
  githubClientSecret: process.env.GITHUB_CLIENT_SECRET as string,
};

// the following keys are used to authenticate github using our Github App creds
const prodOnlyKeys: Array<keyof typeof env> = [
  "githubAppId",
  "githubPrivateKey",
  "githubClientSecret",
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
