import * as AWS from "@aws-sdk/client-s3"
import env from "./env"

const client = new AWS.S3({
  region: env.AWS_REGION,
  credentials: {
    accessKeyId: env.AWS_ACCESS_KEY,
    secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
  },
})

export default async function uploadMedia(key: string, body: Buffer) {
  return client.send(
    new AWS.PutObjectCommand({
      Bucket: env.AWS_BUCKET_NAME,
      Key: key,
      Body: body,
    }),
  )
}
