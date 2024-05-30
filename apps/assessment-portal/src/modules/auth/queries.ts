export const login = (paramValues: any): RequestInit => {
	const query = {
		QueryOperation: "select",
		QueryName: "Assessment_Login_Assessor",
		ClientId: "AadyaTek",
		ParamValues: paramValues,
	};
	return {
		method: "POST",
		body: JSON.stringify(query),
	};
};
