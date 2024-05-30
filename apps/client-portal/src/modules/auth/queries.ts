export const login = (paramValues: any): RequestInit => {
	const query = {
		QueryOperation: "select",
		QueryName: "Client_Login_AdminUser",
		ClientId: "AadyaTek",
		ParamValues: paramValues,
	};
	return {
		method: "POST",
		body: JSON.stringify(query),
	};
};
