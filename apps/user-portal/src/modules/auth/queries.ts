export const login = (paramValues: any): RequestInit => {
	const query = {
		QueryOperation: "select",
		QueryName: "Client_Login_User",
		ClientId: "AadyaTek",
		ParamValues: paramValues,
	};
	return {
		method: "POST",
		body: JSON.stringify(query),
	};
};
