import React from "react";
import { Accordion, List } from "flowbite-react";
import mappingsStore, { CategoryQuestions, RoleQuestions } from "./store";

type GroupedQuestions = {
	category: {
		categoryId: string;
		categoryName: string;
	};
	questions: {
		question: string;
		questionId: string;
	}[];
};
const groupBy = (
	selectedQuestions: {
		question: string;
		questionId: string;
	}[],
	categories: CategoryQuestions[],
) => {
	return categories.reduce((acc, m) => {
		const questions =
			m.questions?.selected?.filter(m =>
				selectedQuestions.some(n => n.questionId === m.questionId),
			) || [];
		if (questions?.length) {
			const res: GroupedQuestions = {
				category: {
					categoryId: m.categoryId,
					categoryName: m.categoryName,
				},
				questions,
			};
			acc.push(res);
		}
		return acc;
	}, [] as GroupedQuestions[]);
};
const GroupedQuestion: React.FC<{
	questions: {
		question: string;
		questionId: string;
	}[];
}> = ({ questions }) => {
	const { categories } = mappingsStore();
	const data = groupBy(questions, categories);
	return (
		<Accordion.Content>
			{data.map(m => (
				<div key={m.category.categoryId}>
					<div className="font-bold text-lg mb-2">
						{m.category.categoryName}
					</div>
					<List>
						{m.questions.map(q => (
							<List.Item key={q.questionId}>
								{q.question}
							</List.Item>
						))}
					</List>
				</div>
			))}
		</Accordion.Content>
	);
};
const RoleQuestionMapping: React.FC = () => {
	const { roleQuestions } = mappingsStore();
	return (
		<div>
			<div className="font-bold text-xl mb-2">Map Role questions</div>
			<Accordion>
				{roleQuestions
					.filter(role => role.questions.length > 0)
					.map((m, idx) => {
						return (
							<Accordion.Panel key={m.roleId}>
								<Accordion.Title>{m.roleName}</Accordion.Title>
								<GroupedQuestion questions={m.questions} />
							</Accordion.Panel>
						);
					})}
			</Accordion>
		</div>
	);
};

export default RoleQuestionMapping;
