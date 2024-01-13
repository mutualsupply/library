import "dotenv/config";
import { objectKeys } from "./utils";

const env = {
	PORT: process.env.PORT || 3000,
	AWS_REGION: process.env.AWS_REGION as string,
	AWS_ACCESS_KEY: process.env.AWS_ACCESS_KEY as string,
	AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY as string,
	AWS_BUCKET_NAME: process.env.AWS_BUCKET_NAME as string,
	GITHUB_BRANCH: process.env.GITHUB_BRANCH as string,
	ED25519_PRIV: process.env.ED25519_PRIV as string,
	API_KEY: process.env.API_KEY as string,
	SYNDICATE_API_KEY: process.env.SYNDICATE_API_KEY as string,
	// SYNDICATE_PROJECT_ID: process.env.SYNDICATE_PROJECT_ID as string,
	// SYNDICATE_CONTRACT_ADDRESS: process.env.SYNDICATE_CONTRACT_ADDRESS as string,
	// SYNDICATE_CHAIN_ID: parseInt(process.env.SYNDICATE_CHAIN_ID as string),
};

for (const key of objectKeys(env)) {
	if (!env[key]) {
		throw new Error(`Missing environment variable ${key}`);
	}
}

export default env;
