import React from "react";
import { FormSpy } from "react-final-form";

type ErrorScrollSpyProps = {
	querySelector?: string;
};

const ErrorScrollSpy: React.FC<ErrorScrollSpyProps> = ({
	querySelector = ".Mui-error > input",
}) => {
	const handleValidationChange = React.useCallback(
		({ submitFailed }: { submitFailed: boolean }) => {
			if (submitFailed) {
				const errorDom = document.querySelector(querySelector);
				if (errorDom) {
					errorDom.scrollIntoView({
						block: "center",
						behavior: "smooth",
					});
					const input = errorDom as HTMLInputElement;
					if (input.focus) {
						// check for focus method coz element might not inputelement
						input.focus();
					}
				} else {
					window.scrollTo({
						top: 0,
						behavior: "smooth",
					});
				}
			}
		},
		[querySelector],
	);
	return (
		<FormSpy
			subscription={{
				submitFailed: true,
			}}
			onChange={handleValidationChange}
		/>
	);
};

export default ErrorScrollSpy;
