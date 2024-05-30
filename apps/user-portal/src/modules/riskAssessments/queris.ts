import {
	RiskAssessmentType,
} from "./interfaces";

export const getRiskLevelsQuery = () => {
	const query = {
		QueryOperation: "select",
		QueryName: "LookUp_Get_ProjectRiskLevels",
		ClientId: "AadyaTek",
		ParamValues: [],
	};
	return {
		method: "POST",
		body: JSON.stringify(query),
	};
};

export const getProjectSeverityLevelsQuery = () => {
	const query = {
		QueryOperation: "select",
		QueryName: "LookUp_Get_ProjectSeverityLevels",
		ClientId: "AadyaTek",
		ParamValues: [],
	};
	return {
		method: "POST",
		body: JSON.stringify(query),
	};
};

export const getProjectPriorityLevelsQuery = () => {
	const query = {
		QueryOperation: "select",
		QueryName: "LookUp_Get_ProjectPriorityLevels",
		ClientId: "AadyaTek",
		ParamValues: [],
	};
	return {
		method: "POST",
		body: JSON.stringify(query),
	};
};

export const getRiskQuery = () => {
	const query = {
		QueryOperation: "select",
		QueryName: "Assessment_Get_ProjectRisk",
		ClientId: "AadyaTek",
		ParamValues: [
			{
				Param: "Condition",
				Value: "a.\"ActionItemsOwnerId\" = '9e326855-d266-41c7-b820-5b4026b38b62'",
			},
		],
	};
	return {
		method: "POST",
		body: JSON.stringify(query),
	};
};
