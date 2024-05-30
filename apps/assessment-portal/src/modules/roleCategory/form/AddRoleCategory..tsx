import React, { useCallback, useEffect, useRef, useState } from "react";
import { useStore } from "@lib/zustand/store";
import { Form, SubmitButton, TextInputField } from "@root/components/AsyncForm";
import validationSchema from "./validationSchema";
import { RoleCategory } from "../interfaces";
import { v4 as uuid } from "uuid";
import { FaCheck, FaTrashCan } from "react-icons/fa6";
import ButtonWithIcon from "@root/components/ButtonWithIcon";

type Props = {
	category?: RoleCategory;
	onSubmitSuccess?: () => void;
	onDelete?: (category: RoleCategory) => void;
};

const initialValues = (category?: RoleCategory | null) => {
	return {
		Category: category?.Category || "",
	};
};
const AddRoleCategory = ({ category, onSubmitSuccess, onDelete }: Props) => {
	// const addNewRoleCategory = useStore(m => m.addNewRoleCategory);
	// const editRoleCategory = useStore(m => m.editRoleCategory);

	const handleSave = (input: any) => {
		// if (category?.CategoryId) {
		// 	return editRoleCategory(category?.CategoryId, {
		// 		...input,
		// 		UniqueId: category?.CategoryId,
		// 	});
		// } else {
		// 	const uniqueId = uuid();
		// 	return addNewRoleCategory({
		// 		UniqueId: uniqueId,
		// 		...input,
		// 	});
		// }
	};
	const handleDelete = useCallback(() => {
		if (onDelete && category) {
			onDelete(category);
		}
	}, [onDelete, category]);

	return (
		<>
			<p className="text-[21px] py-4 font-semibold border-b px-4">
				{category ? "Edit" : "New"} Category
			</p>
			<div className="pt-3 pb-8 mx-4">
				<Form
					onSubmit={handleSave}
					validateOnBlur
					name="category-form"
					onSubmitSuccess={onSubmitSuccess}
					initialValues={initialValues(category)}
					validationSchema={validationSchema()}
				>
					{() => {
						return (
							<>
								<div className="form-wrapper">
									<TextInputField
										label="Category"
										name="Category"
										fullWidth
										autoFocus
									/>
								</div>
								<div className="button-container flex items-center justify-center py-3 gap-[6px] border-t-2 mt-2">
									<SubmitButton
										pt={2}
										className="border bg-dark-100 text-white border-slate-500 rounded-md w-fit py-1 px-3 items-center flex"
									>
										<FaCheck />
										{Boolean(category) ? "Update" : "Add"}
									</SubmitButton>
									{category && onDelete ? (
										<ButtonWithIcon
											classNames="border bg-red-500 text-red-200 border-slate-100 rounded-md w-fit py-1 px-3 items-center justify-around"
											onClick={handleDelete}
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

export default AddRoleCategory;
