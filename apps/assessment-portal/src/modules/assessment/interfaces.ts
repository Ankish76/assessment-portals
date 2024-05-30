export type ProjectAssessmentType = {
	UniqueId: string;
	ConsultingCompanyId: string;
	ConsultingCompany: string;
	AssessorId: string;
	AssessorName: string;
	ProjectId: string;
	ProjectName: string;
	ProjectClientId: string;
	StatusId: string;
	Status: string;
	Comments: string;
	AssessmentPeriodStartDate: string;
	AssessmentPeriodEndDate: string;
	SummaryUrl: string;
	DetailsUrl: string;
	CreatedByAssessorId: string;
	CreatedDateTime: string;
	LastModifiedByAssessorId: null;
	LastModifiedTime: null;
};

export type AddAssessmentType = {
	projectId: string;
	statusId: string;
	comments: string;
	summaryUrl: string;
	detailsUrl: string;
	assessmentPeriodStartDate: string;
	assessmentPeriodEndDate: string;
};
