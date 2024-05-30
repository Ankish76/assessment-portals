import clientConstants from "@root/constants/info";
import { ParamValue } from "@root/types";

export const getAllCategoryQuestions = (paramValues: ParamValue[]) => {
	const query = {
		QueryOperation: "select",
		QueryName: "Client_GetCategoryQuestions",
		ClientId: clientConstants.ClientId,
		ParamValues: paramValues,
	};
	return {
		method: "POST",
		body: JSON.stringify(query),
	};
};
