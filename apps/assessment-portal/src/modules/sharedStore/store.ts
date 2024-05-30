import { clientAPICaller } from "@utils/handler/client";
import { getProjectStatusQuery } from "./query";
import { StateCreator } from "zustand";
import { ProjectStatusType } from "./interfaces";

export type SharedStoreValues = {
	projectStatus: ProjectStatusType[];
};

export type SharedStoreActions = {
	getProjectStatusData: () => void;
};

export type SharedSlice = SharedStoreValues & SharedStoreActions;

const defaultValues: SharedStoreValues = {
	projectStatus: [],
};

export const createSharedSlice: (
	initProps: Partial<SharedStoreValues>,
) => StateCreator<SharedSlice, [], [], SharedSlice> =
	(props = {}) =>
	(set, get, api) => ({
		...defaultValues,
		...props,
		getProjectStatusData: async () => {
			let statusData = await clientAPICaller<ProjectStatusType[]>(
				getProjectStatusQuery(),
			);
			set(s => ({ projectStatus: statusData }));
		},
	});
