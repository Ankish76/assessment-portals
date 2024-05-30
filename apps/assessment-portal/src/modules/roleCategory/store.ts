import {
	getAllCategoryRoleQuestions,
	getRoleCategories,
} from "@root/modules/categories/queries";
import { StateCreator } from "zustand";
import { RoleCategory } from "./interfaces";
import { clientAPICaller } from "@utils/handler/client";

export type RoleQuestionStoreValues = {
	currentRoleCategories: RoleCategory[];
};

export type RoleQuestionStoreActions = {
	getRoleCategories: (roleId: string) => void;
	clearRoleCategories: () => void;
};

export type RoleQuestionSlice = RoleQuestionStoreValues &
	RoleQuestionStoreActions;

const defaultValues: RoleQuestionStoreValues = {
	currentRoleCategories: [],
};

export const createRoleQuestionSlice: (
	initProps: Partial<RoleQuestionStoreValues>,
) => StateCreator<RoleQuestionSlice, [], [], RoleQuestionSlice> =
	(props = {}) =>
	set => ({
		...defaultValues,
		...props,
		getRoleCategories: async roleId => {
			const paramValues = [
				{
					Param: "RoleId",
					Value: roleId,
				},
			];
			let categoryRoleQuestions = await clientAPICaller<RoleCategory[]>(
				getRoleCategories(paramValues),
			);
			set(() => ({ currentRoleCategories: categoryRoleQuestions }));
		},
		clearRoleCategories: () => {
			set(() => ({ currentRoleCategories: [] }));
		},
	});
