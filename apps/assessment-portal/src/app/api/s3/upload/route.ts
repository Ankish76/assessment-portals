// import {
// 	GetObjectCommand,
// 	PutObjectCommand,
// 	S3Client,
// } from "@aws-sdk/client-s3";
// import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { NextResponse } from "next/server";
// const s3 = new S3Client({
// 	region: process.env.DEFAULT_REGION,
// 	credentials: {
// 		accessKeyId: process.env.ACCESS_KEY,
// 		secretAccessKey: process.env.SECRET_KEY,
// 	},
// });

const handler = async (req: any, res: any) => {
	if (req.method !== "POST") {
		return res.status(405).json({ message: "Method not allowed" });
	}

	try {
		let { name, type, file } = await req.json();

		const fileParams = {
			Bucket: process.env.BUCKET_NAME,
			Key: name,
			// Expires: 600,
			ContentType: type,
			// ACL: "public-read",
		};

		// const putCommand = new PutObjectCommand(fileParams);
		// const putUrl = await getSignedUrl(s3, putCommand, {
		// 	expiresIn: 600,
		// });
		// const getCommand = new GetObjectCommand({
		// 	Key: fileParams.Key,
		// 	Bucket: process.env.BUCKET_NAME,
		// });
		// const getUrl = await getSignedUrl(s3, getCommand, {
		// 	expiresIn: 600,
		// });
		// console.log("request url", putUrl, getUrl);
		// return NextResponse.json({ putUrl, getUrl });
		return NextResponse.json({});
	} catch (error: any) {
		return NextResponse.json(error?.response?.data || error);
	}
};

export const GET = handler;
export const HEAD = handler;
export const POST = handler;
export const PUT = handler;
export const DELETE = handler;
export const PATCH = handler;
