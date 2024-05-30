import React, { useCallback, useEffect, useRef, useState } from "react";
import { useStore } from "@lib/zustand/store";
import {
	DatePicekrField,
	Form,
	SubmitButton,
	TextInputField,
} from "@root/components/AsyncForm";
import validationSchema from "./validationSchema";
import { Project, ProjectInput } from "../interfaces";
import { uuid } from "uuidv4";
import { FaCheck, FaTrashCan } from "react-icons/fa6";
import ButtonWithIcon from "@root/components/ButtonWithIcon";

type Props = {
	project?: Project;
	onSubmitSuccess?: () => void;
	onDelete?: (project: Project) => void;
};

const initialValues = (project?: Project | null) => {
	const data: Partial<ProjectInput> = project
		? {
				...project,
				// NewDeliveryDate: new Date(project.NewDeliveryDate),
				// PlannedDeliveryDate: new Date(project.PlannedDeliveryDate),
			}
		: {};
	data.ProjectId = project?.UniqueId;
	delete (data as any).UniqueId;
	delete (data as any).ClientId;
	return data;
};
const AddProject = ({ project, onSubmitSuccess, onDelete }: Props) => {
	const addOrUpdateProject = useStore(m => m.addOrUpdateProject);

	const handleSave = useCallback((input: any) => {
		return addOrUpdateProject(input);
	}, []);
	const handleDelete = useCallback(() => {
		if (onDelete && project) {
			onDelete(project);
		}
	}, [onDelete, project]);

	return (
		<>
			<p className="text-[21px] py-4 font-semibold border-b px-4">
				{project ? "Edit" : "New"} Project
			</p>
			<div className="pt-3 pb-8 mx-4">
				<Form
					onSubmit={handleSave}
					validateOnBlur
					name="project-form"
					onSubmitSuccess={onSubmitSuccess}
					initialValues={initialValues(project)}
					validationSchema={validationSchema()}
				>
					{() => {
						return (
							<>
								<div className="form-wrapper">
									<TextInputField
										label="Name"
										name="ProjectName"
										fullWidth
										autoFocus
										readOnly={Boolean(project)}
									/>
									<TextInputField
										label="Description"
										name="ProjectDesc"
										fullWidth
										autoFocus
									/>
									<DatePicekrField
										label="Planned Delivery Date"
										name="PlannedDeliveryDate"
										autoFocus
									/>
									<DatePicekrField
										label="New Delivery Date"
										name="NewDeliveryDate"
										autoFocus
									/>
									<TextInputField
										label="Work Planned"
										name="WorkPlanned"
										fullWidth
										autoFocus
									/>
									<TextInputField
										label="Work Completed"
										name="WorkCompleted"
										fullWidth
										autoFocus
									/>
									<TextInputField
										label="Capacity Planned"
										name="CapacityPlanned"
										fullWidth
										autoFocus
									/>
									<TextInputField
										label="Capacity Used"
										name="CapacityUsed"
										fullWidth
										autoFocus
									/>
									<TextInputField
										label="Budget Planned"
										name="BudgetPlanned"
										fullWidth
										autoFocus
									/>
									<TextInputField
										label="Budget Used"
										name="BudgetUsed"
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
										{project ? "Update" : "Add"}
									</SubmitButton>
									{project && onDelete ? (
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

export default AddProject;
