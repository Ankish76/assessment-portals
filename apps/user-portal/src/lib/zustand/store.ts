import {
	createAuthSlice,
	AuthSlice,
	AuthStoreValues,
} from "@modules/auth/store";
import {
	ProjectSlice,
	ProjectStoreValues,
	createProjectSlice,
} from "@modules/roleCategory/store";
import {
	RiskSlice,
	RiskStoreValues,
	createRiskSlice,
} from "@root/modules/riskAssessments/store";

import {
	DashboardSlice,
	DashboardStoreValues,
	createDashboardSlice,
} from "@root/modules/dashboard/store";
import { createContext, useContext } from "react";
import { create, useStore as useZustandStore } from "zustand";
import { removeUndefined } from "@helpers/removeUndefined";
import { createJSONStorage, persist } from "zustand/middleware";
import deepmerge from "deepmerge";

export interface PreloadedStoreInterface
	extends Partial<
		AuthStoreValues &
			ProjectStoreValues &
			DashboardStoreValues &
			RiskStoreValues
	> {}

export type StoreInterface = AuthSlice &
	ProjectSlice &
	DashboardSlice &
	RiskSlice;

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
	projects,
	dashboardProjects,
	riskData,
	riskLevels,
	severityLevels,
	priorityLevels,
}: PreloadedStoreInterface) => {
	return create(
		persist<StoreInterface>(
			(...a) => ({
				...createAuthSlice(removeUndefined({ user }))(...a),
				...createProjectSlice(removeUndefined({ projects }))(...a),
				...createDashboardSlice(removeUndefined({ dashboardProjects }))(
					...a,
				),
				...createRiskSlice(
					removeUndefined({
						riskData,
						riskLevels,
						severityLevels,
						priorityLevels,
					}),
				)(...a),
			}),
			{
				name: "questionnaire-user",
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
