import { CheckBox } from "@root/components/AsyncForm";
import * as React from "react";
import { useField } from "react-final-form";
import mappingsStore from "../../store";

const QuestionsSelectField: React.FC<{
	categoryId: string;
	name: string;
	categoryName: string;
}> = ({ categoryId, name, categoryName }) => {
	const {
		input: { value, onChange },
	} = useField(name);
	const { categories } = mappingsStore();
	const catgoryQuestions = categories;
	const question = React.useMemo(() => {
		return (
			catgoryQuestions.find(m => m.categoryId === categoryId)?.questions
				?.selected || []
		);
	}, [catgoryQuestions, categoryId]);
	const handleToggle = React.useCallback(
		(id: string, name: string) => () => {
			const currentIndex = value.findIndex(
				(v: any) => v.questionId === id,
			);
			let newSelected = [...value];
			if (currentIndex === -1) {
				newSelected.push({ question: name, questionId: id });
			} else {
				newSelected = newSelected.splice(currentIndex, 1);
			}
			onChange(newSelected);
		},
		[value, onChange],
	);
	return (
		<div>
			<div className="font-bold text-lg">
				Select Question For {categoryName}
			</div>
			<div>
				{question?.map(m => {
					return (
						<div key={m.questionId}>
							<CheckBox
								checked={
									value.findIndex(
										(v: any) =>
											v.questionId === m.questionId,
									) !== -1
								}
								tabIndex={-1}
								label={m.question}
								onChange={handleToggle(
									m.questionId,
									m.question,
								)}
							/>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default QuestionsSelectField;
