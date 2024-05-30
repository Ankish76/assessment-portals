import React from "react";
import { useField } from "react-final-form";
import { FieldProps } from "./types";

// Import your Tailwind CSS styles here
import "tailwindcss/tailwind.css";

const DropDownField: React.FC<FieldProps<any>> = ({
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
	type,
	validate,
	validateFields,
	value,
	onChange,
	onBlur,
	onFocus,
	placeholder,
	helperText,
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
		parse: type === "number" ? parseFloat : parse,
		subscription,
		type,
		validate,
		validateFields,
		value,
	});

	const error = Boolean((meta.touched && meta.error) || meta.submitError);

	const handleChange = React.useCallback(
		(event: React.ChangeEvent<HTMLSelectElement>) => {
			input.onChange(event.target.value);
			if (onChange) {
				onChange(event, event.target.value);
			}
		},
		[input, onChange],
	);

	const handleBlur = React.useCallback(
		(e: React.FocusEvent<HTMLSelectElement>) => {
			input.onBlur();
			if (onBlur) {
				onBlur(e);
			}
		},
		[input, onBlur],
	);

	const handleFocus = React.useCallback(
		(e: React.FocusEvent<HTMLSelectElement>) => {
			input.onFocus(e);
			if (onFocus) {
				onFocus(e);
			}
		},
		[input, onFocus],
	);

	return (
		<div className="relative">
			<select
				{...input}
				className={`appearance-none w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500 ${
					error ? "border-red-500" : ""
				}`}
				onChange={handleChange}
				onFocus={handleFocus}
				onBlur={handleBlur}
			>
				{/* Add your select options here */}
				{data?.map((option: any) => (
					<option key={option.value} value={option.value}>
						{option.label}
					</option>
				))}
			</select>
			{error && <p className="text-red-500 text-sm mt-1">{meta.error}</p>}
		</div>
	);
};

export default DropDownField;
