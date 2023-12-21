import "dotenv/config";
import { objectKeys } from "./utils";

const env = {
	PORT: process.env.PORT || 3000,
	AWS_REGION: process.env.AWS_REGION as string,
	AWS_ACCESS_KEY: process.env.AWS_ACCESS_KEY as string,
	AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY as string,
	AWS_BUCKET_NAME: process.env.AWS_BUCKET_NAME as string,
};

objectKeys(env).forEach((key) => {
	if (!env[key]) {
		throw new Error(`Missing environment variable ${key}`);
	}
});

export default env;
