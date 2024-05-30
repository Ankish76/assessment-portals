import React from "react";
import arrayMutators from "final-form-arrays";
import validationSchema from "./validationSchema";
import { Form, SubmitButton } from "@root/components/AsyncForm";
import RoleSelectField from "./RoleSelectField";
import { Button } from "flowbite-react";
import mappingsStore from "../../store";
type RolesSelectFormProps = {
	onSubmitSuccess: () => void;
	onBack: () => void;
};

type FromValues = { selected: string[] };

const initialValues = (selected: string[] = []): FromValues => {
	return { selected } as any;
};
const RolesSelectForm: React.FC<RolesSelectFormProps> = ({
	onSubmitSuccess,
	onBack,
}) => {
	const { setSelectedRoles, roles } = mappingsStore();
	const hanldeSubmit = (input: FromValues) => {
		setSelectedRoles(input?.selected);
		return true;
	};
	return (
		<div>
			<div className="font-bold text-xl mb-2">Select Roles</div>
			<Form
				onSubmit={hanldeSubmit}
				validateOnBlur
				mutators={{ ...arrayMutators }}
				name="role-select-form"
				onSubmitSuccess={onSubmitSuccess}
				initialValues={initialValues(roles)}
				validationSchema={validationSchema()}
			>
				{() => {
					return (
						<>
							<div>
								<RoleSelectField name="selected" />
								{/* <RoleAddField name="added" /> */}
							</div>
							<div className="flex justify-between">
								<Button color="inherit" onClick={onBack}>
									Back
								</Button>
								<SubmitButton>Next</SubmitButton>
							</div>
						</>
					);
				}}
			</Form>
		</div>
	);
};

export default RolesSelectForm;
