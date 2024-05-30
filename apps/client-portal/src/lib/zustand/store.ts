import {
	createAuthSlice,
	AuthSlice,
	AuthStoreValues,
} from "@modules/auth/store";
import {
	CategorySlice,
	CategoryStoreValues,
	createCategorySlice,
} from "@modules/categories/store";
import {
	QuestionSlice,
	QuestionStoreValues,
	createQuestionSlice,
} from "@root/modules/questions/store";
import {
	RoleSlice,
	RoleStoreValues,
	createRoleSlice,
} from "@root/modules/roles/store";
import {
	UserSlice,
	UserStoreValues,
	createUserSlice,
} from "@root/modules/users/store";
import {
	RoleQuestionSlice,
	RoleQuestionStoreValues,
	createRoleQuestionSlice,
} from "@root/modules/roleCategory/store";
import {
	ProjectSlice,
	ProjectStoreValues,
	createProjectSlice,
} from "@root/modules/projects/store";
import {
	DashboardSlice,
	DashboardStoreValues,
	createDashboardSlice,
} from "@root/modules/dashboard/store";
import {
	createdProjectFeedbackSlice,
	ProjectFeedbackStoreActions,
	ProjectFeedbackSlice,
	ProjectFeedbackStoreValues,
} from "@root/modules/projectDetail/store";
import { createContext, useContext } from "react";
import { create, useStore as useZustandStore } from "zustand";
import { removeUndefined } from "@helpers/removeUndefined";
import { persist } from "zustand/middleware";
import deepmerge from "deepmerge";

export interface PreloadedStoreInterface
	extends Partial<
		AuthStoreValues &
			CategoryStoreValues &
			QuestionStoreValues &
			RoleStoreValues &
			UserStoreValues &
			ProjectStoreValues &
			RoleQuestionStoreValues &
			DashboardStoreValues &
			ProjectFeedbackStoreValues
	> {}

export type StoreInterface = AuthSlice &
	CategorySlice &
	QuestionSlice &
	RoleSlice &
	UserSlice &
	ProjectSlice &
	RoleQuestionSlice &
	DashboardSlice &
	ProjectFeedbackSlice;

export type StoreType = ReturnType<typeof initializeStore>;

const storeContext = createContext<StoreType | null>(null);

export const Provider = storeContext.Provider;

export const useStore = <T>(selector: (state: StoreInterface) => T) => {
	const store = useContext(storeContext);
	if (!store) throw new Error("Store is missing the provider");
	return useZustandStore(store, selector);
};

export const initializeStore = ({
	user,
	categories,
	questions,
	roles,
	users,
	projects,
	// dashboardProjects,
	currentRoleCategories,
	projectFeedbacks,
	dashboardProjects,
	dashboardProjectsRatings,
}: PreloadedStoreInterface) => {
	return create(
		persist<StoreInterface>(
			(...a) => ({
				...createAuthSlice(removeUndefined({ user }))(...a),
				...createCategorySlice(removeUndefined({ categories }))(...a),
				...createQuestionSlice(removeUndefined({ questions }))(...a),
				...createRoleSlice(removeUndefined({ roles }))(...a),
				...createUserSlice(removeUndefined({ users }))(...a),
				...createProjectSlice(removeUndefined({ projects }))(...a),
				...createRoleQuestionSlice(
					removeUndefined({ currentRoleCategories }),
				)(...a),
				...createDashboardSlice(
					removeUndefined({
						dashboardProjects,
						dashboardProjectsRatings,
					}),
				)(...a),
				...createdProjectFeedbackSlice(
					removeUndefined({ projectFeedbacks }),
				)(...a),
			}),
			{
				name: "questionnaire",
				merge: (persistedState = {}, currentState) =>
					deepmerge(persistedState as any, currentState, {
						arrayMerge: (target, source) => source,
						// arrayMerge: (target, source) =>
						// 	[...source, ...target].filter(
						// 		(m, i, self) =>
						// 			self.findIndex(
						// 				n => n.UniqueId === m.UniqueId,
						// 			) === i,
						// 	),
					}),
			},
		),
	);
};
