import { StateCreator } from "zustand";
import { DashboardProjectType } from "./interfaces";
import { clientAPICaller } from "@root/utils/handler/client";
import { getDashboardDetails } from "./queries";

export type DashboardStoreValues = {
	dashboardProjects: DashboardProjectType[];
};

export type DashboardStoreActions = {
	getDashboardDetails: (userId: string) => void;
};

export type DashboardSlice = DashboardStoreValues & DashboardStoreActions;

const defaultValues: DashboardStoreValues = {
	dashboardProjects: [],
};

export const createDashboardSlice: (
	initProps: Partial<DashboardStoreValues>,
) => StateCreator<DashboardSlice, [], [], DashboardSlice> =
	(props = {}) =>
	set => ({
		...defaultValues,
		...props,
		getDashboardDetails: async (userId: string) => {
			let projects = await clientAPICaller<DashboardProjectType[]>(
				getDashboardDetails({
					UserId: userId,
				}),
			);
			set(state => ({ dashboardProjects: projects }));
		},
	});
