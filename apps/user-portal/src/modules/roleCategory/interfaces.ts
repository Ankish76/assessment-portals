export type RoleCategoryType = {
	CategoryId: string;
	Category: string;
};

export type ProjectRoleCategory = {
	ProjectId: string;
	RoleCategories: RoleCategoryType[];
};

export type Question = {
	UniqueId: string;
	ClientId: string;
	CategoryId: string;
	Question: string;
};

export type ProjectRoleCategoryQuestions = {
	ProjectId: string;
	Categoryid: string;
	Questions: Question[];
};
export type Project = {
	UniqueId: string;
	ClientId: string;
	ProjectId: string;
	ProjectName: string;
	ProjectDesc: string;
	UserId: string;
	RoleId: string;
	Categories: RoleCategoryType[];
};

export type FeedbackPropType = {
	UserId: string;
	ProjectId: string;
	CategoryId: string;
	CategoryQuestionId: string;
	rating?: number;
	comment?: string;
	isAnonymous: boolean
};

export type GetFeedbackType = {
	UserId: string;
	ProjectId: string;
	CategoryId: string;
	CategoryQuestionId: string;
};
export type FeedbackParamsPropType = {
	UserId: string;
	ProjectId: string;
	CategoryId: string;
	CategoryQuestionId: string;
	rating?: number;
	comment?: string;
	showFullDetails: boolean;
	setShowFullDetails: (val: boolean) => void
};
export type UserFeedback = {
	UniqueId: string;
	ClientId: string;
	ProjectId: string;
	UserId: string;
	CategoryId: string;
	CategoryQuestionId: string;
	Rating: string;
	Comments: string;
	ResponseDateTime: string;
	IsAnonymous: boolean
};

export type QuestionLevelFeedbacks = {
	[key: string]: UserFeedback[];
};
