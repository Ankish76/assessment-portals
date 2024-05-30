import clientConstants from "@root/constants/info";
import { FeedbackParams } from "./interfaces";

export const getDashboardDetails = () => {
	const query = {
		QueryOperation: "select",
		QueryName: "Client_Admin_GetDashboardDetails",
		ClientId: clientConstants.ClientId,
		ParamValues: [],
	};
	return {
		method: "POST",
		body: JSON.stringify(query),
	};
};

export const getProjectFeebacks = (params: FeedbackParams) => {
	const paramValues = [
		{
			Param: "ProjectId",
			Value: params.ProjectId || "",
		},
		{
			Param: "UserIdCondition",
			Value: params.UserIdCondition
				? `AND a.\"UserId\" = '${params.UserIdCondition}'`
				: "",
		},
		{
			Param: "CategoryIdCondition",
			Value: params.CategoryIdCondition
				? `AND a.\"CategoryId\" = '${params.CategoryIdCondition}'`
				: "",
		},
		{
			Param: "CategoryQuestionIdCondition",
			Value: params.CategoryQuestionIdCondition
				? `AND a.\"CategoryQuestionId\" = '${params.CategoryQuestionIdCondition}'`
				: "",
		},
		{
			Param: "IsAnonymousCondition",
			Value:
				params.IsAnonymousCondition === false
					? 'AND a."IsAnonymous" is false'
					: params.IsAnonymousCondition === true
						? 'AND a."IsAnonymous" is true'
						: "",
		},
	];

	const query = {
		QueryOperation: "select",
		QueryName: "Client_Get_UserFeedbacks",
		ClientId: clientConstants.ClientId,
		ParamValues: paramValues,
	};
	return {
		method: "POST",
		body: JSON.stringify(query),
	};
};
