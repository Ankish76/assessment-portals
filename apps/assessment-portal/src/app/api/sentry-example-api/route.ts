import { NextResponse } from "next/server";

// A faulty API route to test Sentry's error monitoring
const handler = (_req: any, res: any) => {
	throw new Error("Sentry Example API Route Error");
	return NextResponse.json({ name: "Ankish Kumar" });
};

export const GET = handler;
export const HEAD = handler;
export const POST = handler;
export const PUT = handler;
export const DELETE = handler;
export const PATCH = handler;
