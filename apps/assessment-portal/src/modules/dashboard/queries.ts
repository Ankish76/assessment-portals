import clientConstants from "@root/constants/info";
import { DashboardDetailParam } from "./interfaces";

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
