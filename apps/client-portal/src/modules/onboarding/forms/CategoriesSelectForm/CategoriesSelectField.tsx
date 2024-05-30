import * as React from "react";
import { useFieldArray } from "react-final-form-arrays";
import { Selected } from "../../interfaces";
import { useStore } from "@lib/zustand/store";
import { CheckBox } from "@root/components/AsyncForm";
import QuestionsSelectField from "./QuestionsSelectField";

const CategoriesSelectField: React.FC<{
	name: string;
}> = ({ name }) => {
	const {
		fields: { value, push, remove, error },
	} = useFieldArray<Selected>(name);
	const categories = useStore(m => m.categories);
	const handleToggle = React.useCallback(
		(id: string, name: string) => () => {
			const idx = value
				? value.findIndex((m: any) => m.categoryId === id)
				: -1;
			if (idx === -1) {
				push({
					categoryId: id,
					categoryName: name,
					questions: { selected: [] },
				});
			} else {
				remove(idx);
			}
		},
		[push, value, remove],
	);
	return (
		<>
			{categories.map(m => {
				const checked = value
					? value.findIndex(v => v.categoryId === m.UniqueId)
					: -1;
				return (
					<div
						className="border-2 border-gray-200 m-2"
						key={m.UniqueId}
					>
						<CheckBox
							checked={checked !== -1}
							tabIndex={-1}
							label={m.Category}
							onChange={handleToggle(m.UniqueId, m.Category)}
						/>
						{checked !== -1 ? (
							<QuestionsSelectField
								name={`${name}.${checked}.questions`}
								categoryId={m.UniqueId}
								categoryName={m.Category}
							/>
						) : null}
					</div>
				);
			})}
			{/* </div> */}
		</>
	);
};

export default CategoriesSelectField;
