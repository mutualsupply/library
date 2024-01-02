import * as AWS from "@aws-sdk/client-s3";
import multer from "@koa/multer";
import { createReadStream } from "fs";
import env from "./env";

class MediaClass {
	cdnBaseUrl = "https://media.mutual.supply";
	client: AWS.S3;
	constructor() {
		this.client = new AWS.S3({
			region: env.AWS_REGION,
			credentials: {
				accessKeyId: env.AWS_ACCESS_KEY,
				secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
			},
		});
	}

	private getFilename(file: multer.File) {
		return `${file.filename}-${new Date().toISOString().split("T")[0]}.${
			file.originalname.split(".")[file.originalname.split(".").length - 1]
		}`;
	}

	async upload(file: multer.File) {
		const filename = this.getFilename(file);
		await this.client.send(
			new AWS.PutObjectCommand({
				Bucket: env.AWS_BUCKET_NAME,
				Key: filename,
				Body: createReadStream(file.path),
			}),
		);
		return `${this.cdnBaseUrl}/${filename}`;
	}
}

const Media = new MediaClass();
export default Media;
