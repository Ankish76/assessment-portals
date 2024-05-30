import { clientAPICaller } from "@utils/handler/client";
import { StateCreator } from "zustand";
import { AddAssessmentType, ProjectAssessmentType } from "./interfaces";
import { addProjectAssessment, getProjectAssessmentsQuery } from "./queries";

export type ProjectAssessmentStoreValues = {
	projectAssessmentsData: ProjectAssessmentType[];
};

export type ProjectAssessmentStoreActions = {
	addProjectAssessmentData: (data: AddAssessmentType) => void;
	getProjectAssessmentsData: () => void;
};

export type ProjectAssessmentSlice = ProjectAssessmentStoreValues &
	ProjectAssessmentStoreActions;

const defaultValues: ProjectAssessmentStoreValues = {
	projectAssessmentsData: [],
};

export const createProjectAssessmentSlice: (
	initProps: Partial<ProjectAssessmentStoreValues>,
) => StateCreator<ProjectAssessmentSlice, [], [], ProjectAssessmentSlice> =
	(props = {}) =>
	(set, get, api) => ({
		...defaultValues,
		...props,
		addProjectAssessmentData: async (assessment: AddAssessmentType) => {
			await clientAPICaller<any>(addProjectAssessment(assessment));
		},
		getProjectAssessmentsData: async () => {
			let assessments = await clientAPICaller<any>(
				getProjectAssessmentsQuery(),
			);
			set(state => ({ projectAssessmentsData: assessments }));
		},
	});
