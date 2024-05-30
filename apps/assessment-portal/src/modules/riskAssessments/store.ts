import { clientAPICaller } from "@utils/handler/client";
import { StateCreator } from "zustand";
import {
	AddRiskAssessmentType,
	PriorityLevelType,
	RiskAssessmentType,
	RiskLevelsType,
	SeverityLevelsType,
	UpdateRiskAssessmentType,
} from "./interfaces";
import {
	addRiskAssessment,
	getProjectPriorityLevelsQuery,
	getProjectSeverityLevelsQuery,
	getRiskLevelsQuery,
	getRiskQuery,
	updateRiskAssessment,
} from "./queris";

export type RiskStoreValues = {
	riskData: RiskAssessmentType[];
	riskLevels: RiskLevelsType[];
	severityLevels: SeverityLevelsType[];
	priorityLevels: PriorityLevelType[];
};

export type RiskStoreActions = {
	addRiskAssessmentData: (data: RiskAssessmentType) => void;
	getRiskData: () => void;
	getRiskLevels: () => void;
	getProjectSeverityLevels: () => void;
	getProjectPriority: () => void;
	updateAssessmentProjectRisk: (data: RiskAssessmentType) => void;
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
		addRiskAssessmentData: async (
			riskAssessment: AddRiskAssessmentType,
		) => {
			await clientAPICaller<any>(addRiskAssessment(riskAssessment));
		},
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
		updateAssessmentProjectRisk: async (
			updateRiskAssessmentData: UpdateRiskAssessmentType,
		) => {
			await clientAPICaller<any>(
				updateRiskAssessment(updateRiskAssessmentData),
			);
		},
	});
