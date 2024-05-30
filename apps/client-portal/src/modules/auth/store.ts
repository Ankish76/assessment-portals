import { clientAPICaller } from "@utils/handler/client";
import { login } from "@root/modules/auth/queries";
import { StateCreator } from "zustand";

export type User = {
	UniqueId: string;
	ClientId: string;
	Fullname: string;
	Email: string;
	Password: string;
	Phone: string;
	CreatedDateTime: string;
	IsActive: boolean;
};

export type AuthStoreValues = {
	user: User | null;
	loginError: string;
	loginSubmitting: boolean;
};

export type AuthStoreActions = {
	userLogin: (paramValues: any) => Promise<void>;
	userLogout: () => void;
	resetUserStore: () => void;
};

export type AuthSlice = AuthStoreValues & AuthStoreActions;

const defaultAuthValues: AuthStoreValues = {
	user: null,
	loginSubmitting: false,
	loginError: "",
};

export const createAuthSlice: (
	initProps: Partial<AuthStoreValues>,
) => StateCreator<AuthSlice, [], [], AuthSlice> =
	(props = {}) =>
	(set, get, api) => ({
		...defaultAuthValues,
		...props,
		userLogin: async (paramValues: any) => {
			set(s => ({ ...s, loginSubmitting: true }));
			let user = await clientAPICaller<User[]>(login(paramValues));
			if (user.length <= 0) {
				set(s => ({
					loginError: "Please Enter Valid Credentials",
					user: null,
				}));
			} else {
				localStorage.setItem('adminUserData', JSON.stringify(user[0]))
				set(state => ({ user: user[0], loginError: "" }));
			}
			set(s => ({ ...s, loginSubmitting: false }));
		},
		userLogout: () => {
			set(state => ({ user: null }));
		},
		resetUserStore: () => {
			set(state => defaultAuthValues);
		},
	});
