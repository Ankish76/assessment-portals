import { StateCreator } from "zustand";
import {
	DashboardProjectType,
	FeedbackParams,
	ProjectFeedback,
} from "./interfaces";
import { clientAPICaller } from "@root/utils/handler/client";
import { getDashboardDetails, getProjectFeebacks } from "./queries";

export type ProjectFeedbackStoreValues = {
	projectFeedbacks: ProjectFeedback[];
};

export type ProjectFeedbackStoreActions = {
	getProjectFeebacks: (paramsData: FeedbackParams) => {};
};

export type ProjectFeedbackSlice = ProjectFeedbackStoreValues &
	ProjectFeedbackStoreActions;

const defaultValues: ProjectFeedbackStoreValues = {
	projectFeedbacks: [],
};

export const createdProjectFeedbackSlice: (
	initProps: Partial<ProjectFeedbackStoreValues>,
) => StateCreator<ProjectFeedbackSlice, [], [], ProjectFeedbackSlice> =
	(props = {}) =>
	set => ({
		...defaultValues,
		...props,
		getProjectFeebacks: async params => {
			let projects = await clientAPICaller<ProjectFeedback[]>(
				getProjectFeebacks(params),
			);
			set(state => ({ ...state, projectFeedbacks: projects }));
		},
	});
