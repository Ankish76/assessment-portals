import { StateCreator } from "zustand";
import {
	DashboardDetailParam,
	DashboardProject,
	DashboardProjectType,
} from "./interfaces";
import { clientAPICaller } from "@root/utils/handler/client";
import { getDashboardDetails, getDashboardProjectRatings } from "./queries";

export type DashboardStoreValues = {
	dashboardProjects: DashboardProjectType[];
	dashboardProjectsRatings: DashboardProject[];
};

export type DashboardStoreActions = {
	getDashboardDetails: () => void;
	getDashboardProjectRatings: (data: DashboardDetailParam) => void;
};

export type DashboardSlice = DashboardStoreValues & DashboardStoreActions;

const defaultValues: DashboardStoreValues = {
	dashboardProjects: [],
	dashboardProjectsRatings: [],
};

export const createDashboardSlice: (
	initProps: Partial<DashboardStoreValues>,
) => StateCreator<DashboardSlice, [], [], DashboardSlice> =
	(props = {}) =>
	set => ({
		...defaultValues,
		...props,
		getDashboardDetails: async () => {
			let projects = await clientAPICaller<DashboardProjectType[]>(
				getDashboardDetails(),
			);
			set(state => ({ ...state, dashboardProjects: projects }));
		},
		getDashboardProjectRatings: async (data: DashboardDetailParam) => {
			let projects = await clientAPICaller<DashboardProject[]>(
				getDashboardProjectRatings(data),
			);
			set(state => ({
				...state,
				dashboardProjectsRatings: [
					...state.dashboardProjectsRatings.filter(
						dp => data.projectId !== dp.ProjectId,
					),
					projects[0],
				],
			}));
		},
	});
