import axios from "axios";
import { NextResponse } from "next/server";

type queryProps = {
	QueryName: string;
	ClientId: string;
	ParamValues: any[];
};

const handler = async (req: Request, context: any) => {
	let endpointUrl = `${process.env.API_ENDPOINT}` as string;
	let body = {} as queryProps;
	try {
		body = await req.json();
		const proxiedReq = await axios.post(endpointUrl, body, {
			headers: {
				"Content-Type": "application/json",
				AuthorizationToken: `ax123gr2`,
			},
		});
		if (proxiedReq.status === 200) {
			return NextResponse.json({ data: proxiedReq.data ?? [] });
		}
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
// // If `OPTIONS` is not defined, Next.js will automatically implement `OPTIONS` and  set the appropriate Response `Allow` header depending on the other methods defined in the route handler.
// export async function OPTIONS(request: Request) { }
