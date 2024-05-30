import React, { useContext } from "react";
import arrayMutators from "final-form-arrays";
import validationSchema from "./validationSchema";
import { Form, SubmitButton } from "@root/components/AsyncForm";
import CategoriesSelectField from "./CategoriesSelectField";
import { FromValues } from "../../interfaces";
import { Button } from "flowbite-react";
import mappingsStore, { CategoryQuestions } from "../../store";

type CategoriesSelectFormProps = {
	onSubmitSuccess: () => void;
	onBack: () => void;
};

const initialValues = (selected: CategoryQuestions[] = []): FromValues => {
	return { selected } as any;
};

const CategoriesSelectForm: React.FC<CategoriesSelectFormProps> = ({
	onSubmitSuccess,
	onBack,
}) => {
	const { setSelectedCategories, categories } = mappingsStore();
	const hanldeSubmit = (input: FromValues) => {
		setSelectedCategories(input?.selected as any);
		return true;
	};
	return (
		<>
			<div className="font-bold text-xl mb-2">Select Categories</div>
			<Form
				onSubmit={hanldeSubmit}
				validateOnBlur
				mutators={{ ...arrayMutators }}
				name="categories-select-form"
				onSubmitSuccess={onSubmitSuccess}
				initialValues={initialValues(categories)}
				// validationSchema={validationSchema()}
			>
				{() => {
					return (
						<>
							<CategoriesSelectField name="selected" />
							<div className="flex justify-between">
								<Button
									color="inherit"
									disabled
									onClick={onBack}
								>
									Back
								</Button>
								<SubmitButton>Next</SubmitButton>
							</div>
						</>
					);
				}}
			</Form>
		</>
	);
};

export default CategoriesSelectForm;
