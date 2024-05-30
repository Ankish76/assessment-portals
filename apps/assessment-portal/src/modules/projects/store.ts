import {
	// deleteProject,
	getAllProjects as getProjects,
	addOrUpdateProject,
} from "@root/modules/projects/queries";
import { StateCreator } from "zustand";
import { Project, ProjectInput } from "./interfaces";
import { clientAPICaller } from "@utils/handler/client";

export type ProjectStoreValues = {
	projects: Project[];
};

export type ProjectStoreActions = {
	getAllProjects: () => Promise<void>;
	addOrUpdateProject: (cat: ProjectInput) => Promise<boolean>;
	deleteProject: (id: string) => Promise<boolean>;
};

export type ProjectSlice = ProjectStoreValues & ProjectStoreActions;

const defaultValues: ProjectStoreValues = {
	projects: [],
};

export const createProjectSlice: (
	initProps: Partial<ProjectStoreValues>,
) => StateCreator<ProjectSlice, [], [], ProjectSlice> =
	(props = {}) =>
	(set, get, state) => ({
		...defaultValues,
		...props,
		getAllProjects: async () => {
			const projects = await clientAPICaller<Project[]>(getProjects());
			set(state => ({ projects }));
		},
		addOrUpdateProject: async (input: ProjectInput) => {
			const res = await clientAPICaller<Project[]>(
				addOrUpdateProject(input),
			);
			await get().getAllProjects();
			return Boolean(res);
		},
		deleteProject: async UniqueId => {
			// const res = await clientAPICaller<Project[]>(
			// 	deleteProject(UniqueId),
			// );
			// await get().getAllCategories();
			// return Boolean(res);
			set(state => ({
				projects: state.projects.filter(m => m.UniqueId !== UniqueId),
			}));
			return Promise.resolve(true);
		},
	});
