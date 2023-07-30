import "dotenv/config"

const env = {
  PORT: process.env.PORT || 3000,
  AWS_REGION: process.env.AWS_REGION as string,
  AWS_ACCESS_KEY: process.env.AWS_ACCESS_KEY as string,
  AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY as string,
  AWS_BUCKET_NAME: process.env.AWS_BUCKET_NAME as string,
}

export default env
