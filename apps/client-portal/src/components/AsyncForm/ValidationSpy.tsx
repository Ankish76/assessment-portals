import React from 'react';
import { FormSpy } from 'react-final-form';

type ValidationSpyProps = {
	onChange: (valid: boolean) => void;
};

const ValidationSpy: React.FC<ValidationSpyProps> = ({ onChange }) => {
	const handleValidationChange = React.useCallback(
		({ valid, invalid, dirty, error, errors }: any) => {
			if (dirty) {
				if (invalid || error || errors.length) {
					onChange(false);
				}
				if (valid) {
					onChange(true);
				}
			}
		},
		[onChange],
	);
	return (
		<FormSpy
			subscription={{
				valid: true,
				invalid: true,
				dirty: true,
				error: true,
				errors: true,
			}}
			onChange={handleValidationChange}
		/>
	);
};

export default ValidationSpy;
