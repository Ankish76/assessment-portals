import React from "react";
import { useField } from "react-final-form";
import { UseFieldConfig } from "react-final-form";
import { Optional } from "./types";
import CheckBox from "./CheckBox";

type CheckboxFieldProps<T extends Record<string, any> = any> = {
	name: string;
	label?: string;
	variant?: string;
} & UseFieldConfig<any> &
	Optional<T, "onChange" | "value" | "onBlur"> &
	React.InputHTMLAttributes<HTMLInputElement>;

const CheckboxField: React.FC<CheckboxFieldProps> = ({
	name,
	afterSubmit,
	allowNull,
	beforeSubmit,
	data,
	defaultValue,
	format,
	formatOnBlur,
	initialValue,
	isEqual,
	multiple,
	parse,
	subscription,
	type = "checkbox",
	validate,
	validateFields,
	value,
	onChange,
	onBlur,
	onFocus,
	variant = "outlined",
	...rest
}) => {
	const { input, meta } = useField(name, {
		afterSubmit,
		allowNull,
		beforeSubmit,
		data,
		defaultValue,
		format,
		formatOnBlur,
		initialValue,
		isEqual,
		multiple,
		parse,
		subscription,
		type,
		validate,
		validateFields,
		value,
	});

	const error = Boolean((meta.touched && meta.error) || meta.submitError);

	const handleChange = React.useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			input.onChange(e);
			if (onChange) {
				onChange(e);
			}
		},
		[input, onChange],
	);

	const handleBlur = React.useCallback(
		(e: React.FocusEvent<HTMLInputElement>) => {
			input.onBlur();
			if (onBlur) {
				onBlur(e);
			}
		},
		[input, onBlur],
	);

	const handleFocus = React.useCallback(
		(e: React.FocusEvent<HTMLInputElement>) => {
			input.onFocus(e);
			if (onFocus) {
				onFocus(e);
			}
		},
		[input, onFocus],
	);

	return (
		<div className={`input-label-wrapper`}>
			<CheckBox
				{...input}
				onChange={handleChange}
				onBlur={handleBlur}
				onFocus={handleFocus}
				className="h-5 w-5 mr-5"
			/>
			<div className="pt-2 text-xs text-red-200 font-medium">
				{error ? meta.error || meta.submitError : ""}
			</div>
		</div>
	);
};

export default CheckboxField;
