import { StateCreator } from "zustand";
import { User } from "./interfaces";
import {
	addUpdateUser,
	deleteUser,
	getAllUsers,
} from "@root/modules/users/queries";
import { clientAPICaller } from "@utils/handler/client";

export type UserStoreValues = {
	users: User[];
};
export type UserStoreActions = {
	addEditUser: (user: User) => void;
	deleteUser: (id: string) => void;
	getAllUsers: () => void;
};

export type UserSlice = UserStoreValues & UserStoreActions;

const defaultValues: UserStoreValues = {
	users: [],
};

export const createUserSlice: (
	initProps: Partial<UserStoreValues>,
) => StateCreator<UserSlice, [], [], UserSlice> =
	(props = {}) =>
	set => ({
		...defaultValues,
		...props,
		getAllUsers: async () => {
			let users = await clientAPICaller<User[]>(getAllUsers());
			set(() => ({ users: users }));
		},
		addEditUser: async (user: User) => {
			await clientAPICaller<User[]>(addUpdateUser(user));
			let users = await clientAPICaller<User[]>(getAllUsers());
			set(() => ({ users: users }));
		},
		deleteUser: async (id: string) => {
			await clientAPICaller<User[]>(deleteUser({ UserId: id }));
			let users = await clientAPICaller<User[]>(getAllUsers());
			set(() => ({ users: users }));
		},
	});
