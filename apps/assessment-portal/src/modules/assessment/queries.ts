import { AddAssessmentType } from "./interfaces";

export const addProjectAssessment = (params: AddAssessmentType) => {
	const queryParams = [
		{
			Param: "ConsultingCompanyId",
			Value: "294e1da7-b24f-4191-b67b-c8a628c92edb",
		},
		{
			Param: "AssessorId",
			Value: "f4e27394-4118-42c9-9b08-a297dff6cfd0",
		},
		{
			Param: "ProjectId",
			Value: params.projectId,
		},
		{
			Param: "ProjectClientId",
			Value: "Finilio",
		},
		{
			Param: "StatusId",
			Value: params.statusId,
		},
		{
			Param: "Comments",
			Value: params.comments,
		},
		{
			Param: "AssessmentPeriodStartDate",
			Value: params.assessmentPeriodStartDate,
		},
		{
			Param: "AssessmentPeriodEndDate",
			Value: params.assessmentPeriodEndDate,
		},
		{
			Param: "SummaryUrl",
			Value: params.summaryUrl,
		},
		{
			Param: "DetailsUrl",
			Value: params.detailsUrl,
		},
		{
			Param: "ReviewerAssessorId",
			Value: "037515da-686d-4fe5-8679-4b4e466e8e66",
		},
	];
	const query = {
		QueryOperation: "select",
		QueryName: "Assessment_Add_ProjectAssessment",
		ClientId: "AadyaTek",
		ParamValues: queryParams,
	};
	return {
		method: "POST",
		body: JSON.stringify(query),
	};
};

export const getProjectAssessmentsQuery = () => {
	const query = {
		QueryOperation: "select",
		QueryName: "Assessment_Get_ProjectAssessments",
		ClientId: "AadyaTek",
		ParamValues: [
			{
				Param: "Condition",
				Value: "a.\"AssessorId\" = 'f4e27394-4118-42c9-9b08-a297dff6cfd0'",
			},
		],
	};
	return {
		method: "POST",
		body: JSON.stringify(query),
	};
};
