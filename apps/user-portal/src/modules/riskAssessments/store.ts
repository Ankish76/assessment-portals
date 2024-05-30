import { clientAPICaller } from "@utils/handler/client";
import { StateCreator } from "zustand";
import {
	PriorityLevelType,
	RiskAssessmentType,
	RiskLevelsType,
	SeverityLevelsType,
} from "./interfaces";
import {
	getProjectPriorityLevelsQuery,
	getProjectSeverityLevelsQuery,
	getRiskLevelsQuery,
	getRiskQuery,
} from "./queris";

export type RiskStoreValues = {
	riskData: RiskAssessmentType[];
	riskLevels: RiskLevelsType[];
	severityLevels: SeverityLevelsType[];
	priorityLevels: PriorityLevelType[];
};

export type RiskStoreActions = {
	getRiskData: () => void;
	getRiskLevels: () => void;
	getProjectSeverityLevels: () => void;
	getProjectPriority: () => void;
};

export type RiskSlice = RiskStoreValues & RiskStoreActions;

const defaultValues: RiskStoreValues = {
	riskData: [],
	riskLevels: [],
	severityLevels: [],
	priorityLevels: [],
};

export const createRiskSlice: (
	initProps: Partial<RiskStoreValues>,
) => StateCreator<RiskSlice, [], [], RiskSlice> =
	(props = {}) =>
	(set, get, api) => ({
		...defaultValues,
		...props,
		getRiskData: async () => {
			let riskData = await clientAPICaller<any>(getRiskQuery());
			set(state => ({ ...state, riskData: riskData }));
		},
		getRiskLevels: async () => {
			let riskLevel = await clientAPICaller<any>(getRiskLevelsQuery());
			set(state => ({ ...state, riskLevels: riskLevel }));
		},
		getProjectSeverityLevels: async () => {
			let severityLevel = await clientAPICaller<any>(
				getProjectSeverityLevelsQuery(),
			);
			set(state => ({ ...state, severityLevels: severityLevel }));
		},
		getProjectPriority: async () => {
			let priorityLevel = await clientAPICaller<any>(
				getProjectPriorityLevelsQuery(),
			);
			set(state => ({ ...state, priorityLevels: priorityLevel }));
		},
	});
