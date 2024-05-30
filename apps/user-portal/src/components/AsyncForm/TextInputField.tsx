import React from "react";
import { useField } from "react-final-form";
import { UseFieldConfig } from "react-final-form";
import { Optional } from "./types";
import { FloatingLabel } from "flowbite-react";

type TextInputFieldProps<T extends Record<string, any> = any> = {
	name: string;
	placeholder?: string;
	variant?: string;
} & UseFieldConfig<any> &
	Optional<T, "onChange" | "value" | "onBlur"> &
	React.InputHTMLAttributes<HTMLInputElement>;

const TextInputField: React.FC<TextInputFieldProps> = ({
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
	type = "text",
	validate,
	validateFields,
	value,
	onChange,
	onBlur,
	onFocus,
	placeholder,
	helperText,
	label,
	variant = "outlined",
	onKeyDown,
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
		parse: type === "number" ? parseFloat : parse,
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
			<FloatingLabel
				{...input}
				variant="outlined"
				label={label}
				color={error ? "error" : "default"}
				onKeyDown={onKeyDown}
			/>
			<div className="py-2 text-xs text-red-200 font-medium">
				{error ? meta.error || meta.submitError : helperText}
			</div>
		</div>
	);
};

export default TextInputField;
