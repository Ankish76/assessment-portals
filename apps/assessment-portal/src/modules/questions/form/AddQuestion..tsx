import React, { useCallback, useEffect, useRef, useState } from "react";
import { useStore } from "@lib/zustand/store";
import { Form, SubmitButton, TextInputField } from "@root/components/AsyncForm";
import validationSchema from "./validationSchema";
import { Question } from "../interfaces";
import { v4 as uuid } from "uuid";
import { FaCheck, FaTrashCan } from "react-icons/fa6";
import ButtonWithIcon from "@root/components/ButtonWithIcon";

type Props = {
	question?: Question;
	onSubmitSuccess?: () => void;
	onDelete?: (question: Question) => void;
};

const initialValues = (question?: Question | null) => {
	return {
		Question: question?.Question || "",
	};
};
const AddQuestion = ({ question, onSubmitSuccess, onDelete }: Props) => {
	// const addNewQuestion = useStore(m => m.addNewQuestion);
	// const editQuestion = useStore(m => m.editQuestion);

	const handleSave = (input: any) => {
		// if (question?.UniqueId) {
		// 	return editQuestion(question?.UniqueId, {
		// 		...input,
		// 		UniqueId: question?.UniqueId,
		// 	});
		// } else {
		// 	const uniqueId = uuid();
		// 	return addNewQuestion({
		// 		UniqueId: uniqueId,
		// 		...input,
		// 	});
		// }
	};
	const handleDelete = useCallback(() => {
		if (onDelete && question) {
			onDelete(question);
		}
	}, [onDelete, question]);

	return (
		<>
			<p className="text-[21px] py-4 font-semibold border-b px-4">
				{question ? "Edit" : "New"} Question
			</p>
			<div className="pt-3 pb-8 mx-4">
				<Form
					onSubmit={handleSave}
					validateOnBlur
					name="question-form"
					onSubmitSuccess={onSubmitSuccess}
					initialValues={initialValues(question)}
					validationSchema={validationSchema()}
				>
					{() => {
						return (
							<>
								<div className="form-wrapper">
									<TextInputField
										label="Question"
										name="Question"
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
										{Boolean(question) ? "Update" : "Add"}
									</SubmitButton>
									{question && onDelete ? (
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

export default AddQuestion;
