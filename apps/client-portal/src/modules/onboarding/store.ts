import { create } from "zustand";

type Question = {
	question: string;
	questionId: string;
};
export type CategoryQuestions = {
	categoryId: string;
	categoryName: string;
	questions?: { selected: Question[] };
};
export type RoleQuestions = {
	roleId: string;
	roleName: string;
	questions: { question: string; questionId: string }[];
};

type Store = {
	categories: CategoryQuestions[];
	roles: string[];
	roleQuestions: RoleQuestions[];
	setSelectedCategories: (data: CategoryQuestions[]) => void;
	setSelectedRoles: (data: string[]) => void;
	setRoleQuestions: (data: RoleQuestions[]) => void;
};

const mappingsStore = create<Store>()(set => ({
	categories: [],
	roles: [],
	roleQuestions: [],
	setSelectedCategories: (cat: CategoryQuestions[]) => {
		set(state => ({ categories: cat }));
	},
	setSelectedRoles: (cat: string[]) => {
		set(state => ({ roles: cat }));
	},
	setRoleQuestions: (cat: RoleQuestions[]) => {
		set(state => ({ roleQuestions: cat }));
	},
	skipHydration: true,
}));

export default mappingsStore;
