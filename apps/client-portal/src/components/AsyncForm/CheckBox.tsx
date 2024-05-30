import React from "react";
import { Checkbox, CheckboxProps } from "flowbite-react";

type CheckBoxProps = {
	label?: string;
} & CheckboxProps;

const CheckBox: React.FC<CheckBoxProps> = ({ label, ...rest }) => {
	return (
		<div className={`input-label-wrapper`}>
			<label className="w-full p-4 block">
				<Checkbox className="h-5 w-5 mr-5" {...rest} />
				{label}
			</label>
		</div>
	);
};

export default CheckBox;
