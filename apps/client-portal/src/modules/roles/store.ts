import {
	addRole,
	deleteRole,
	getAllRoles,
	updateRole,
} from "@root/modules/roles/queries";
import { StateCreator } from "zustand";
import { Role } from "./interfaces";
import { clientAPICaller } from "@utils/handler/client";

export type RoleStoreValues = {
	roles: Role[];
};

export type RoleStoreActions = {
	getAllRolesData: () => Promise<void>;
	addNewRole: (cat: Role) => void;
	editRole: (id: string, cat: Role) => void;
	deleteRole: (id: string) => void;
};
export type RoleSlice = RoleStoreValues & RoleStoreActions;

const defaultValues: RoleStoreValues = {
	roles: [],
};

export const createRoleSlice: (
	initProps: Partial<RoleStoreValues>,
) => StateCreator<RoleSlice, [], [], RoleSlice> =
	(props = {}) =>
	(set, get, state) => ({
		...defaultValues,
		...props,
		getAllRolesData: async () => {
			let roles = await clientAPICaller<Role[]>(getAllRoles());
			set(state => ({ roles: roles }));
		},
		addNewRole: async (cat: Role) => {
			const res = await clientAPICaller<Role[]>(
				addRole(cat.Role, cat.Desc),
			);
			await get().getAllRolesData();
			return Boolean(res);
		},
		editRole: async (UniqueId, cat) => {
			const res = await clientAPICaller<Role[]>(
				updateRole(UniqueId || cat.UniqueId, cat.Role, cat.Desc),
			);
			await get().getAllRolesData();
			return Boolean(res);
		},
		deleteRole: async UniqueId => {
			const res = await clientAPICaller<Role[]>(deleteRole(UniqueId));
			await get().getAllRolesData();
			return Boolean(res);
		},
	});
