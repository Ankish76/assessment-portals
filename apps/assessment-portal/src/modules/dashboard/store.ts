import { StateCreator } from "zustand";
import { DashboardDetailParam, DashboardProject } from "./interfaces";
import { clientAPICaller } from "@root/utils/handler/client";
import { getDashboardProjectRatings } from "./queries";

export type DashboardStoreValues = {
	dashboardProjectsRatings: DashboardProject[];
};

export type DashboardStoreActions = {
	getDashboardProjectRatings: (data: DashboardDetailParam) => void;
};

export type DashboardSlice = DashboardStoreValues & DashboardStoreActions;

const defaultValues: DashboardStoreValues = {
	dashboardProjectsRatings: [],
};

export const createDashboardSlice: (
	initProps: Partial<DashboardStoreValues>,
) => StateCreator<DashboardSlice, [], [], DashboardSlice> =
	(props = {}) =>
	set => ({
		...defaultValues,
		...props,
		getDashboardProjectRatings: async (data: DashboardDetailParam) => {
			let projects = await clientAPICaller<DashboardProject[]>(
				getDashboardProjectRatings(data),
			);
			set(state => ({ dashboardProjectsRatings: projects }));
		},
	});
