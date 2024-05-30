export type CategoryWithRating = {
	Rating: number | null;
	Category: string;
	CategoryId: string;
};

export type DashboardProject = {
	ProjectId: string;
	UniqueId: string;
	ClientId: string;
	ProjectName: string;
	ProjectDesc: string;
	Rating: string | number | null;
	SuccessPredictorPercent: string | number;
	RatingByCategories: CategoryWithRating[];
};

export type FeedbackParams = {
	ProjectId: string;
	UserIdCondition: string;
	CategoryIdCondition: string;
	CategoryQuestionIdCondition: string;
	IsAnonymousCondition: null | boolean;
	DateRangeCondition: any;
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
