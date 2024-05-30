import { objectToParams } from "@root/helpers/convertToParams";

export const getDashboardDetails = (values: { UserId: string }) => {
	const paramValues = objectToParams(values);
	const query = {
		QueryOperation: "select",
		QueryName: "Client_User_GetDashboardDetails",
		ClientId: "Finilio",
		ParamValues: paramValues,
	};
	return {
		method: "POST",
		body: JSON.stringify(query),
	};
};
