import {
	AddRiskAssessmentType,
	RiskAssessmentType,
	UpdateRiskAssessmentType,
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

export const addRiskAssessment = (params: AddRiskAssessmentType) => {
	const queryParams = [
		{
			Param: "ProjectId",
			Value: params.ProjectId,
		},
		{
			Param: "AssessorId",
			Value: "f4e27394-4118-42c9-9b08-a297dff6cfd0",
		},
		{
			Param: "CategoryId",
			Value: "86d6bbf7-7367-4e53-8492-b7e292a4665c",
		},
		{
			Param: "RiskLevelId",
			Value: params.RiskLevel,
		},
		{
			Param: "SeverityLevelId",
			Value: params.SeverityLevel,
		},
		{
			Param: "PriorityLevelId",
			Value: params.PriorityLevel,
		},
		{
			Param: "RiskDesc",
			Value: params.RiskDesc,
		},
		{
			Param: "Mitigation",
			Value: params.Mitigation,
		},
		{
			Param: "ActionItems",
			Value: params.ActionItems,
		},
		{
			Param: "ActionItemsOwnerId",
			Value: "9e326855-d266-41c7-b820-5b4026b38b62",
		},
	];
	const query = {
		QueryOperation: "select",
		QueryName: "Assessment_Add_ProjectRisk",
		ClientId: "AadyaTek",
		ParamValues: queryParams,
	};
	return {
		method: "POST",
		body: JSON.stringify(query),
	};
};

export const updateRiskAssessment = (params: UpdateRiskAssessmentType) => {
	const queryParams = [
		{
			Param: "UniqueId",
			Value: params.UniqueId,
		},
		{
			Param: "ResolvedByUserId",
			Value: "9e326855-d266-41c7-b820-5b4026b38b62",
		},
		{
			Param: "ActionItemsOwnerId",
			Value: params.ActionItemsOwnerId,
		},
		{
			Param: "ProjectId",
			Value: params.ProjectId,
		},
		{
			Param: "AssessorId",
			Value: "f4e27394-4118-42c9-9b08-a297dff6cfd0",
		},
		{
			Param: "CategoryId",
			Value: "86d6bbf7-7367-4e53-8492-b7e292a4665c",
		},
		{
			Param: "RiskLevelId",
			Value: params.RiskLevel,
		},
		{
			Param: "SeverityLevelId",
			Value: params.SeverityLevel,
		},
		{
			Param: "PriorityLevelId",
			Value: params.PriorityLevel,
		},
		{
			Param: "RiskDesc",
			Value: params.RiskDesc,
		},
		{
			Param: "Mitigation",
			Value: params.Mitigation,
		},
		{
			Param: "ActionItems",
			Value: params.ActionItems,
		},
		{
			Param: "LastModifiedByAssessorId",
			Value: "f4e27394-4118-42c9-9b08-a297dff6cfd0",
		},
	];
	const query = {
		QueryOperation: "update",
		QueryName: "Assessment_Update_ProjectRisk",
		ClientId: "AadyaTek",
		ParamValues: queryParams,
	};
	return {
		method: "POST",
		body: JSON.stringify(query),
	};
};
