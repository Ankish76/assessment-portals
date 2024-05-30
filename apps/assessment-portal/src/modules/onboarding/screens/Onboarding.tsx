"use client";
import * as React from "react";
import { useRouter } from "next/navigation";
import CategoriesSelectForm from "../forms/CategoriesSelectForm";
import { useStore } from "@lib/zustand/store";
import RolesSelectForm from "../forms/RolesSelectForm";
import MappingForm from "../forms/MappingForm";
import RoleQuestionMapping from "../RoleQuestionMapping";

// const steps = ["Categories and Questions", "Roles", "Mapping"];

const Onboarding = () => {
	const { push } = useRouter();
	const [activeStep, setActiveStep] = React.useState(0);
	const categories = useStore(m => m.categories);
	const roles = useStore(m => m.roles);
	const questions = useStore(m => m.questions);
	const getCategoryQuestions = useStore(m => m.getCategoryQuestions);
	const setCategoryQuestions = useStore(m => m.setCategoryQuestions);
	const getAllRoles = useStore(m => m.getAllRolesData);
	const handleComplete = React.useCallback(() => {
		push("/");
	}, [push]);
	const handleNext = React.useCallback(() => {
		setActiveStep(prev => prev + 1);
	}, []);
	const handleBack = React.useCallback(() => {
		setActiveStep(prevActiveStep => prevActiveStep - 1);
	}, []);
	React.useEffect(() => {}, [categories]);

	React.useEffect(() => {
		setCategoryQuestions([]);
		const getQuestions = () => {
			for (const category of categories) {
				getCategoryQuestions(category.UniqueId);
			}
		};
		if (categories.length > 0) {
			getQuestions();
		}
	}, []);

	React.useEffect(() => {
		if (roles?.length <= 0) {
			getAllRoles();
		}
	}, [roles]);
	return (
		<>
			{activeStep === 0 ? (
				<CategoriesSelectForm
					onSubmitSuccess={handleNext}
					onBack={handleBack}
				/>
			) : null}
			{activeStep === 1 ? (
				<RolesSelectForm
					onSubmitSuccess={handleNext}
					onBack={handleBack}
				/>
			) : null}
			{activeStep === 2 ? (
				<MappingForm onSubmitSuccess={handleNext} onBack={handleBack} />
			) : null}
			{activeStep === 3 ? <RoleQuestionMapping /> : null}
		</>
	);
};

export default Onboarding;
