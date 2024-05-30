export type RiskAssessmentType = {
	UniqueId: string;
	ProjectId: string;
	AssessorId: string;
	AssessorName: string;
	CategoryId: string;
	Category: string;
	RiskLevelId: string;
	RiskLevel: string;
	SeverityLevelId: string;
	SeverityLevel: string;
	PriorityLevelId: string;
	PriorityLevel: string;
	RiskDesc: string;
	Mitigation: string;
	ActionItems: string;
	ActionItemsOwnerId: string;
	ActionItemsOwner: string;
	Resolution: string;
	ResolvedByUserId: string;
	ResolvedByUser: string;
	CreatedDateTime: string;
	LastModifiedByAssessorId: string;
	LastModifiedAssessorName: string;
	LastModifiedTime: string;
};

export type AddRiskAssessmentType = {
	PriorityLevel: string;
	RiskLevel: string;
	ActionItemsOwner: string;
	ActionItems: string;
	Category: string;
	LastModifiedAssessorName: string;
	Mitigation: string;
	Resolution: string;
	ResolvedByUser: string;
	RiskDesc: string;
	SeverityLevel: string;
	ProjectId: string;
};

export type RiskLevelsType = {
	UniqueId: string;
	RiskLevel: string;
};

export type SeverityLevelsType = {
	UniqueId: string;
	SeverityLevel: string;
};

export type PriorityLevelType = {
	UniqueId: string;
	PriorityLevel: string;
};

export type UpdateRiskAssessmentType = {
	UniqueId: string;
	PriorityLevel: string;
	RiskLevel: string;
	ActionItemsOwner: string;
	ActionItemsOwnerId: string;
	ActionItems: string;
	Category: string;
	LastModifiedAssessorName: string;
	Mitigation: string;
	Resolution: string;
	ResolvedByUser: string;
	RiskDesc: string;
	SeverityLevel: string;
	ProjectId: string;
};
