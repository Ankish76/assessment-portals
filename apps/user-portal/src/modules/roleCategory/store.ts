import { StateCreator } from "zustand";
import { GetFeedbackType } from "./interfaces";
import { clientAPICaller } from "@root/utils/handler/client";
import {
	addUserFeedback,
	getCategoryQuestions,
	getRoleCategories,
	getUserFeedbacks,
} from "../roleCategory/queries";
import { getAllUserProjects } from "./queries";
import {
	FeedbackPropType,
	QuestionLevelFeedbacks,
	UserFeedback,
	Project,
	ProjectRoleCategory,
	ProjectRoleCategoryQuestions,
	Question,
	RoleCategoryType,
} from "../roleCategory/interfaces";

export type ProjectStoreValues = {
	projects: Project[];
	projectRoleCategories: ProjectRoleCategory[];
	roleCategoryQuestions: ProjectRoleCategoryQuestions | null;
	questionFeedbacks: QuestionLevelFeedbacks;
};

export type ProjectStoreActions = {
	getAllUserProjects: (userId: string) => void;
	getAllProjectRoleCategories: (projectId: string, roleId: string) => void;
	getRoleCategoryQuestions: (projectId: string, categoryId: string) => void;
	getUserFeedbacks: (data: GetFeedbackType) => void;
	addUserFeedback: (data: FeedbackPropType) => void;
	clearRoleCategoryQuestions: ()=>void
};

export type ProjectSlice = ProjectStoreValues & ProjectStoreActions;

const defaultValues: ProjectStoreValues = {
	projects: [],
	projectRoleCategories: [],
	roleCategoryQuestions: null,
	questionFeedbacks: {},
};

export const createProjectSlice: (
	initProps: Partial<ProjectStoreValues>,
) => StateCreator<ProjectSlice, [], [], ProjectSlice> =
	(props = {}) =>
	set => ({
		...defaultValues,
		...props,
		getAllUserProjects: async (userId: string) => {
			let projects = await clientAPICaller<Project[]>(
				getAllUserProjects({
					UserId: userId,
				}),
			);
			set(state => ({ projects: projects }));
		},
		getAllProjectRoleCategories: async (
			projectId: string,
			roleId: string,
		) => {
			let roleCategories = await clientAPICaller<RoleCategoryType[]>(
				getRoleCategories({
					RoleId: roleId,
				}),
			);
			set(state => ({
				...state,
				projectRoleCategories: [
					...state.projectRoleCategories,
					{ ProjectId: projectId, RoleCategories: roleCategories },
				],
			}));
		},
		getRoleCategoryQuestions: async (
			projectId: string,
			categoryId: string,
		) => {
			let questions = await clientAPICaller<Question[]>(
				getCategoryQuestions({
					CategoryId: categoryId,
				}),
			);
			set(state => ({
				...state,
				roleCategoryQuestions: {
					ProjectId: projectId,
					Categoryid: categoryId,
					Questions: questions,
				},
			}));
		},
		clearRoleCategoryQuestions: ()=>{
			set(state=> ({...state, roleCategoryQuestions: null}))
		},
		getUserFeedbacks: async (values: GetFeedbackType) => {
			let feedbacks = await clientAPICaller<UserFeedback[]>(
				getUserFeedbacks(values),
			);
			if (feedbacks)
				set(state => ({
					...state,
					questionFeedbacks: {
						...state.questionFeedbacks,
						[values.CategoryQuestionId]: feedbacks,
					},
				}));
		},
		addUserFeedback: async (values: FeedbackPropType) => {
			await clientAPICaller<UserFeedback[]>(addUserFeedback(values));
		},
	});
