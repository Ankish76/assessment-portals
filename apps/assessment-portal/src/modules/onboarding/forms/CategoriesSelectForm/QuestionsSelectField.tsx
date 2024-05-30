import { CheckBox } from "@root/components/AsyncForm";
import * as React from "react";
import { useStore } from "@lib/zustand/store";
import { useField } from "react-final-form";

const QuestionsSelectField: React.FC<{
	categoryId: string;
	name: string;
	categoryName: string;
}> = ({ categoryId, name, categoryName }) => {
	const questions = useStore(m => m.questions);
	const setCategoryQuestions = useStore(m => m.setCategoryQuestions);
	const getCategoryQuestions = useStore(m => m.getCategoryQuestions);
	const {
		input: { value, onChange },
	} = useField(`${name}.selected`);
	const questionData = React.useMemo(() => {
		return questions.filter((m: any) => m.category === categoryId);
	}, [questions, categoryId]);
	const handleToggle = React.useCallback(
		(id: string, question: string) => () => {
			const currentIndex = value.indexOf(id);
			const newSelected = [...value];
			if (currentIndex === -1) {
				newSelected.push({ questionId: id, question: question });
			} else {
				newSelected.splice(currentIndex, 1);
			}
			onChange(newSelected);
		},
		[value, onChange],
	);

	React.useEffect(() => {
		return () => getCategoryQuestions(categoryId);
	}, [categoryId]);
	return (
		<div className="p-4">
			{questionData?.length ? (
				<div>
					<div className="font-semibold">
						Select Question For {categoryName}
					</div>
					<div>
						{questionData.map((m: any) => {
							const checked = value
								? value.findIndex(
										(v: any) => v.questionId === m.UniqueId,
									)
								: -1;
							return (
								<div key={m.UniqueId}>
									<CheckBox
										checked={checked !== -1}
										tabIndex={-1}
										label={m.Question}
										onChange={handleToggle(
											m.UniqueId,
											m.Question,
										)}
									/>
								</div>
							);
						})}
					</div>
				</div>
			) : null}
		</div>
	);
};

export default QuestionsSelectField;
