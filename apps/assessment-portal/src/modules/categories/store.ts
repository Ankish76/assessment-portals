import {
	addCategory,
	deleteCategory,
	getAllCategories as getCategories,
	updateCategory,
} from "@root/modules/categories/queries";
import { StateCreator } from "zustand";
import { Category } from "./interfaces";
import { clientAPICaller } from "@utils/handler/client";

export type CategoryStoreValues = {
	categories: Category[];
};

export type CategoryStoreActions = {
	getAllCategories: () => Promise<void>;
	addNewCategory: (cat: Category) => Promise<boolean>;
	editCategory: (id: string, cat: Category) => Promise<boolean>;
	deleteCategory: (id: string) => Promise<boolean>;
};

export type CategorySlice = CategoryStoreValues & CategoryStoreActions;

const defaultValues: CategoryStoreValues = {
	categories: [],
};

export const createCategorySlice: (
	initProps: Partial<CategoryStoreValues>,
) => StateCreator<CategorySlice, [], [], CategorySlice> =
	(props = {}) =>
	(set, get, state) => ({
		...defaultValues,
		...props,
		getAllCategories: async () => {
			const categories =
				await clientAPICaller<Category[]>(getCategories());
			set(state => ({ categories: categories }));
		},
		addNewCategory: async (cat: Category) => {
			const res = await clientAPICaller<Category[]>(
				addCategory(cat.Category, cat.Desc),
			);
			await get().getAllCategories();
			return Boolean(res);
		},
		editCategory: async (UniqueId, cat) => {
			const res = await clientAPICaller<Category[]>(
				updateCategory(
					UniqueId || cat.UniqueId,
					cat.Category,
					cat.Desc,
				),
			);
			await get().getAllCategories();
			return Boolean(res);
		},
		deleteCategory: async UniqueId => {
			const res = await clientAPICaller<Category[]>(
				deleteCategory(UniqueId),
			);
			await get().getAllCategories();
			return Boolean(res);
		},
	});
