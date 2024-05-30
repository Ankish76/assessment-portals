import {
	DropDownField,
	Form,
	SubmitButton,
	TextInputField,
} from "@root/components/AsyncForm";
import React, { useCallback } from "react";
import validationSchema from "./validationSchema";
import { User } from "../interfaces";
import { uuid } from "uuidv4";
import { FaCheck, FaTrashCan } from "react-icons/fa6";
import ButtonWithIcon from "@root/components/ButtonWithIcon";
import { useStore } from "@lib/zustand/store";
import { usePathname, useRouter } from "next/navigation";

type Props = {
	userData?: any;
	close?: () => void;
	deleteUser: any;
};

const initialValues = (userData?: User | null) => {
	return {
		Fullname: userData?.Fullname || "",
		Email: userData?.Email || "",
		Phone: userData?.Phone || "",
		Password: "",
	};
};
const AddUserData = ({ userData, close, deleteUser }: Props) => {
	// const editUser = useStore(m => m.editUser);
	const addEditUser = useStore(m => m.addEditUser);
	const handleSave = useCallback((input: any) => {
		delete input.ConfirmPassword;
		addEditUser({
			...input,
		});
		return true;
	}, []);

	const router = useRouter();
	const path = usePathname();
	const onSubmitSuccess = () => {
		router.push(path);
		close && close();
	};

	return (
		<>
			<p className="text-[21px] py-4 font-semibold border-b px-4">
				{userData ? "Edit" : "New"} Users
			</p>
			<div className="pt-3 pb-8 mx-4">
				<Form
					onSubmit={handleSave}
					validateOnBlur
					name="user-form"
					onSubmitSuccess={onSubmitSuccess}
					initialValues={initialValues(userData)}
					validationSchema={validationSchema()}
				>
					{() => {
						return (
							<>
								<div className="form-wrapper">
									<TextInputField
										label="User Name"
										name="Fullname"
										fullWidth
										autoFocus
									/>
									<TextInputField
										label="Email"
										name="Email"
										fullWidth
									/>
									<TextInputField
										label="Phone"
										name="Phone"
										fullWidth
									/>
									<TextInputField
										label="Password"
										name="Password"
										fullWidth
										type="password"
									/>
									<TextInputField
										label="ConfirmPassword"
										name="ConfirmPassword"
										type="password"
										fullWidth
									/>
								</div>
								<div className="button-container flex items-center justify-center py-4 gap-[6px] border-t-2 mt-2">
									<SubmitButton
										iconLoading={true}
										pt={2}
										className="border bg-dark-100 text-white border-slate-500 flex rounded-md w-fit py-1 px-4 items-center"
									>
										<div className="mr-2">
											<FaCheck />
										</div>
										{Boolean(userData) ? "Update" : "Add"}
									</SubmitButton>
									{userData ? (
										<ButtonWithIcon
											classNames="border bg-red-500 text-red-200 border-slate-100 rounded-md w-fit py-1 px-3 items-center justify-around"
											onClick={deleteUser}
											icon={<FaTrashCan />}
											text="Delete"
										/>
									) : null}
								</div>
							</>
						);
					}}
				</Form>
			</div>
		</>
	);
};

export default AddUserData;
