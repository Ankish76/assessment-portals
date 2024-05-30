export type Question = {
	Question: string;
	UniqueId: string;
	ClientId: string;
};
export type CategoryQuestions = {
	category: string;
	questions?: Question[];
};
