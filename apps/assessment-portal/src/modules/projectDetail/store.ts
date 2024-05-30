import { StateCreator } from "zustand";
import {
	DashboardProject,
	FeedbackParams,
	ProjectFeedback,
} from "./interfaces";
import { clientAPICaller } from "@root/utils/handler/client";
import { getDashboardDetails, getProjectFeebacks } from "./queries";

export type ProjectFeedbackStoreValues = {
	dashboardProjects: DashboardProject[];
	projectFeedbacks: ProjectFeedback[];
};

export type ProjectFeedbackStoreActions = {
	getDashboardDetails: () => void;
	getProjectFeebacks: (paramsData: FeedbackParams) => {};
};

export type ProjectFeedbackSlice = ProjectFeedbackStoreValues &
	ProjectFeedbackStoreActions;

const defaultValues: ProjectFeedbackStoreValues = {
	dashboardProjects: [],
	projectFeedbacks: [],
};

export const createdProjectFeedbackSlice: (
	initProps: Partial<ProjectFeedbackStoreValues>,
) => StateCreator<ProjectFeedbackSlice, [], [], ProjectFeedbackSlice> =
	(props = {}) =>
	set => ({
		...defaultValues,
		...props,
		getDashboardDetails: async () => {
			let projects = await clientAPICaller<DashboardProject[]>(
				getDashboardDetails(),
			);
			set(state => ({ dashboardProjects: projects }));
		},
		getProjectFeebacks: async params => {
			let projects = await clientAPICaller<ProjectFeedback[]>(
				getProjectFeebacks(params),
			);
			set(state => ({ ...state, projectFeedbacks: projects }));
		},
	});
