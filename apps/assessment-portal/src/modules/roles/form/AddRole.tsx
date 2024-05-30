import { uuid } from "uuidv4";
import { Form, SubmitButton, TextInputField } from "@root/components/AsyncForm";
import { Role } from "../interfaces";
import validationSchema from "./validationSchema";
import { FaCheck, FaTrashCan } from "react-icons/fa6";
import ButtonWithIcon from "@root/components/ButtonWithIcon";
import { useStore } from "@root/lib/zustand/store";

type Props = {
	roleData?: any;
	close?: () => void;
	deleteRole: any;
};

const initialValues = (role?: Role | null) => {
	return {
		Role: role?.Role || "",
		Desc: role?.Desc || "",
	};
};
const AddRole = ({ roleData, close, deleteRole }: Props) => {
	const addNewRole = useStore(m => m.addNewRole);
	const editRole = useStore(m => m.editRole);

	const handleSave = (input: any) => {
		if (roleData?.UniqueId) {
			editRole(roleData?.UniqueId, {
				...input,
				UniqueId: roleData?.UniqueId,
			});
		} else {
			const uniqueId = uuid();
			addNewRole({
				UniqueId: uniqueId,
				...input,
			});
		}
		return true;
	};

	const onSubmitSuccess = () => {
		close && close();
	};
	return (
		<div>
			<p className="text-[21px] py-4 font-semibold border-b px-4">
				{roleData ? "Edit" : "New"} Role
			</p>
			<div className="pt-3 pb-8 mx-4">
				<Form
					onSubmit={handleSave}
					validateOnBlur
					name="Role-form"
					onSubmitSuccess={onSubmitSuccess}
					initialValues={initialValues(roleData)}
					validationSchema={validationSchema()}
				>
					{() => {
						return (
							<>
								<div className="form-wrapper">
									<TextInputField
										label="Role"
										name="Role"
										fullWidth
										autoFocus
									/>
									<TextInputField
										label="Description"
										name="Desc"
										fullWidth
									/>
								</div>
								<div className="button-container flex items-center justify-center py-4 gap-[6px] border-t-2 mt-2">
									<SubmitButton
										pt={2}
										className="border bg-dark-100 text-white border-slate-500 rounded-md w-fit py-1 px-4 items-center flex"
									>
										<FaCheck />
										{Boolean(roleData) ? "Update" : "Add"}
									</SubmitButton>
									{roleData ? (
										<ButtonWithIcon
											classNames="border bg-red-500 text-red-200 border-slate-100 rounded-md w-fit py-1 px-3 items-center justify-around"
											onClick={deleteRole}
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
		</div>
	);
};

export default AddRole;
