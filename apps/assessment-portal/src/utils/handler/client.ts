// if (typeof window === "undefined") {
// 	throw new Error(
// 		"Please do not use this file on server side use serverAPICaller instead",
// 	);
// }

export const clientAPICaller = async <T>(init: RequestInit) => {
	const result = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api`, {
		...init,
		headers: {
			...(init.headers || {}),
			"Content-Type": "application/json",
		},
	});
	const response = await result.json();
	return response.data as T;
};
