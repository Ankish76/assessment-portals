import React from "react";
import arrayMutators from "final-form-arrays";
import validationSchema from "./validationSchema";
import QuestionsSelectField from "./QuestionsSelectField";
import { Role } from "@root/modules/roles/interfaces";
import { Form, SubmitButton } from "@root/components/AsyncForm";
import { Button, Accordion } from "flowbite-react";
import mappingsStore, { RoleQuestions } from "../../store";
import { useStore } from "@root/lib/zustand/store";

type MappingFormProps = {
	onSubmitSuccess: () => void;
	onBack: () => void;
};

type FromValues = {
	mapping: {
		roleId: string;
		roleName: string;
		questions: { questionId: string; question: string }[];
	}[];
};

const initialValues = (
	roles: Role[],
	value: RoleQuestions[] = [],
): FromValues => {
	return {
		mapping: roles.map(m => {
			return {
				roleId: m.UniqueId,
				roleName: m.Role,
				questions: [],
			};
		}),
	};
};

const MappingForm: React.FC<MappingFormProps> = ({
	onSubmitSuccess,
	onBack,
}) => {
	const rolesData = useStore(m => m.roles);
	const { roles, categories, setRoleQuestions, roleQuestions } =
		mappingsStore();
	const hanldeSubmit = React.useCallback((input: FromValues) => {
		setRoleQuestions(input.mapping);
		return true;
	}, []);
	return (
		<div>
			<div className="font-bold text-xl mb-2">Map questions</div>
			<Form
				onSubmit={hanldeSubmit}
				validateOnBlur
				mutators={{ ...arrayMutators }}
				name="question-mapping-form"
				onSubmitSuccess={onSubmitSuccess}
				initialValues={initialValues(rolesData, roleQuestions)}
				validationSchema={validationSchema()}
			>
				{() => {
					return (
						<>
							<div>
								<Accordion>
									{rolesData
										?.filter(role =>
											roles.includes(role.UniqueId),
										)
										.map((m, idx) => {
											return (
												<Accordion.Panel
													key={m.UniqueId}
												>
													<Accordion.Title>
														{m.Role}
													</Accordion.Title>
													<Accordion.Content>
														{categories.map(cq => (
															<QuestionsSelectField
																key={
																	cq.categoryId
																}
																categoryId={
																	cq.categoryId
																}
																categoryName={
																	cq.categoryName
																}
																name={`mapping.${idx}.questions`}
															/>
														))}
													</Accordion.Content>
												</Accordion.Panel>
											);
										})}
								</Accordion>
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

export default MappingForm;
