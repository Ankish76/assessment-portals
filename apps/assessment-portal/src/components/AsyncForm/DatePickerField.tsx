import React from "react";
import { useField } from "react-final-form";
import { Datepicker } from "flowbite-react";

type DateInputFieldProps = {
	name: string;
	label?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;
const formatDate = (dateString: string) => {
	const date = new Date(dateString);
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, "0");
	const day = String(date.getDate()).padStart(2, "0");

	return `${year}-${month}-${day}`;
};

const DatePicekrField: React.FC<DateInputFieldProps> = ({
	name,
	label,
	...rest
}) => {
	const { input, meta } = useField(name);

	return (
		<div className="input-label-wrapper">
			{label && <div className="text-xs">{label}</div>}
			<Datepicker
				// {...input}
				// {...rest}
				value={input.value}
				onSelectedDateChanged={value =>
					input.onChange(formatDate(value.toString()))
				}
			/>
			<div className="py-2 text-xs text-red-200 font-medium">
				{meta.touched && meta.error ? meta.error : null}
			</div>
		</div>
	);
};

export default DatePicekrField;
