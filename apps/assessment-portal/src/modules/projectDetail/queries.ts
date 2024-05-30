import clientConstants from "@root/constants/info";
import { FeedbackParams } from "./interfaces";

export const getDashboardDetails = () => {
	const query = {
		QueryOperation: "select",
		QueryName: "Assessment_Get_Project",
		ClientId: "AadyaTek",
		ParamValues: [
			{
				Param: "Condition",
				Value: "\"ConsultingCompanyId\" = '294e1da7-b24f-4191-b67b-c8a628c92edb' AND \"AssessorId\" = 'f4e27394-4118-42c9-9b08-a297dff6cfd0'",
			},
		],
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
			Param: "ProjectClientId",
			Value: "Finilio",
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
		{
			Param: "DateRangeCondition",
			Value: params.DateRangeCondition
				? `AND (a.\"ResponseDateTime\" >= '${params.DateRangeCondition[0]}' AND a.\"ResponseDateTime\" <= '${params.DateRangeCondition[1]}')`
				: "",
		},
		{
			Param: "OrderByCondition",
			Value: 'Order by a."ResponseDateTime" desc',
		},
		{
			Param: "LimitCondition",
			Value: "Limit 10",
		},
		{
			Param: "OffsetCondition",
			Value: "Offset 0",
		},
	];

	const query = {
		QueryOperation: "select",
		QueryName: "Client_Get_UserFeedbacks_V2",
		ClientId: clientConstants.ClientId,
		ParamValues: paramValues,
	};

	return {
		method: "POST",
		body: JSON.stringify(query),
	};
};
