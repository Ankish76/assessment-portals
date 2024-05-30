export const getProjectStatusQuery = () => {
	const query = {
		QueryOperation: "select",
		QueryName: "LookUp_Get_ProjectStatus",
		ClientId: "AadyaTek",
		ParamValues: [],
	};
	return {
		method: "POST",
		body: JSON.stringify(query),
	};
};
