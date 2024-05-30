import { getAllCategoryQuestions } from "@root/modules/questions/queries";
import { CategoryQuestions, Question } from "./interfaces";
import { StateCreator } from "zustand";
import { clientAPICaller } from "@utils/handler/client";

export type QuestionStoreValues = {
	questions: Question[];
};

export type QuestionStoreActions = {
	setCategoryQuestions: (data: Question[]) => void;
	getCategoryQuestions: (categoryid: string) => void;
	clearQuestions: () => void;
};

export type QuestionSlice = QuestionStoreValues & QuestionStoreActions;

const defaultValues: QuestionStoreValues = {
	questions: [],
};

export const createQuestionSlice: (
	initProps: Partial<QuestionStoreValues>,
) => StateCreator<QuestionSlice, [], [], QuestionSlice> =
	(props = {}) =>
	set => ({
		...defaultValues,
		...props,
		setCategoryQuestions: (data: Question[]) => {
			set(state => ({
				questions: data,
			}));
		},
		getCategoryQuestions: async categoryid => {
			const paramValues = [
				{
					Param: "CategoryId",
					Value: categoryid,
				},
			];
			let categoryQuestions = await clientAPICaller<Question[]>(
				getAllCategoryQuestions(paramValues),
			);
			set(state => {
				return {
					questions: categoryQuestions,
				};
			});
		},
		clearQuestions: () => {
			set(state => ({
				questions: [],
			}));
		},
	});
