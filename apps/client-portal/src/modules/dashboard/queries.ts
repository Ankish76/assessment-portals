import clientConstants from "@root/constants/info";
import { DashboardDetailParam, FeedbackParams } from "./interfaces";

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


export const getDashboardProjectRatings = ({
	projectId,
	DateRangeCondition,
}: DashboardDetailParam) => {
	const queryParam = [
		{
			Param: "ProjectId",
			Value: projectId,
		},
		{
			Param: "ProjectClientId",
			Value: "Finilio",
		},
		{
			Param: "DateRangeCondition",
			Value: DateRangeCondition
				? `AND (UFB.\"ResponseDateTime\" >= '${DateRangeCondition[0]}'  AND UFB.\"ResponseDateTime\" <= '${DateRangeCondition[1]}')`
				: "",
		},
	];
	const query = {
		QueryOperation: "select",
		QueryName: "Client_Get_ProjectDashboardDetails_V2",
		ClientId: clientConstants.ClientId,
		ParamValues: queryParam,
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
			Value: "",
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
