if (typeof window !== "undefined") {
	throw new Error(
		"Please do not use this file on client side use clientAPICaller instead",
	);
}

export const serverAPICaller = async <T>(init: RequestInit) => {
	const result = await fetch(`${process.env.API_ENDPOINT}`, {
		...init,
		headers: {
			...(init.headers || {}),
			"Content-Type": "application/json",
			AuthorizationToken: `${process.env.API_KEY}`,
		},
	});
	const response = await result.json();
	return response as T;
};
