import { CheckBox } from "@root/components/AsyncForm";
import { useStore } from "@lib/zustand/store";
import { Role } from "@root/modules/roles/interfaces";
import * as React from "react";
import { useField } from "react-final-form";

const RoleSelectField: React.FC<{
	name: string;
}> = ({ name }) => {
	const {
		input: { value = [], onChange },
	} = useField<string[]>(name);
	const roles = useStore(m => m.roles);
	const handleToggle = React.useCallback(
		(id: string) => () => {
			const exists = value?.includes(id);
			if (exists) {
				onChange(value.filter(m => m !== id));
			} else {
				onChange([...value, id]);
			}
		},
		[onChange, value],
	);
	return (
		<div>
			<div className="flex flex-wrap">
				{roles.map((m: Role) => {
					return (
						<div
							className="border-2 border-gray-200 m-2"
							key={m.UniqueId}
						>
							<CheckBox
								checked={value?.includes(m.UniqueId)}
								tabIndex={-1}
								label={m.Role}
								onChange={handleToggle(m.UniqueId)}
							/>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default RoleSelectField;
