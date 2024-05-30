export type CategoryWithRating = {
	Rating: number | null;
	Category: string;
	CategoryId: string;
};

export type DashboardProjectType = {
	ProjectId: string;
	ClientId: string;
	ProjectName: string;
	ProjectDesc: string;
	PlannedDeliveryDate: string;
	NewDeliveryDate: string;
	WorkPlanned: string;
	WorkCompleted: string;
	WorkCompletedPercent: string;
	CapacityPlanned: string;
	CapacityUsed: string;
	CapacityUsedPercent: string;
	BudgetPlanned: string;
	BudgetUsed: string;
	BudgetUsedPercent: string;
	Rating: string;
	SuccessPredictorPercent: string;
};

export type FeedbackParams = {
	ProjectId: string;
	UserIdCondition: string;
	CategoryIdCondition: string;
	CategoryQuestionIdCondition: string;
	IsAnonymousCondition: null | boolean;
	// DateRangeCondition: any;
};

export type ProjectFeedback = {
	UniqueId: string;
	ClientId: string;
	ProjectId: string;
	UserId: string;
	CategoryId: string;
	CategoryQuestionId: string;
	Rating: string;
	Comments: string;
	ResponseDateTime: string;
	IsAnonymous: boolean;
	CategoryName: string;
	CategoryQuestion: string;
	UserName: string;
};

export type DashboardDetailParam = {
	projectId: string;
	DateRangeCondition: string[] | null;
};

export type DashboardProject = {
	UniqueId: string;
	ClientId: string;
	ProjectName: string;
	ProjectDesc: string;
	Rating: string | number | null;
	SuccessPredictorPercent: string | number;
	RatingByCategories: CategoryWithRating[];
	ProjectId: string;
};
