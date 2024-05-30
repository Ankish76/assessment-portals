import { Select } from "flowbite-react";
import { useCallback, useEffect, useState } from "react";
import { FeedbackParams } from "../interfaces";
import { useStore } from "@root/lib/zustand/store";

const FeedbackFilters = ({
	projectId,
	// dateValue,
}: {
	projectId: string;
	// dateValue: any;
}) => {
	const getProjectFeebacks = useStore(m => m.getProjectFeebacks);
	const getCategoryQuestions = useStore(m => m.getCategoryQuestions);
	const clearQuestions = useStore(m => m.clearQuestions);
	const getAllCategories = useStore(m => m.getAllCategories);
	const getAllUsers = useStore(m => m.getAllUsers);

	const categories = useStore(m => m.categories);
	const users = useStore(m => m.users);
	const questions = useStore(m => m.questions);
	const [feedbackFilters, setFeedbackFilters] = useState<FeedbackParams>({
		UserIdCondition: "",
		ProjectId: projectId,
		CategoryIdCondition: "",
		CategoryQuestionIdCondition: "",
		IsAnonymousCondition: null,
		// DateRangeCondition: dateValue ? Object.values(dateValue) : null,
	});

	useEffect(() => {
		getProjectFeebacks({
			...feedbackFilters,
			// DateRangeCondition: dateValue ? Object.values(dateValue) : null,
		});
		setFeedbackFilters(prev => ({
			...prev,
			// DateRangeCondition: dateValue ? Object.values(dateValue) : null,
		}));
	}, []);

	const handleChangeFilters = useCallback(
		(key: any, val: any) => {
			if (key === "CategoryIdCondition") {
				if (val) getCategoryQuestions(val);
				else {
					clearQuestions();
				}
				setFeedbackFilters(prev => ({
					...prev,
					CategoryQuestionIdCondition: "",
					[key]: val,
				}));
				getProjectFeebacks({
					...feedbackFilters,
					CategoryQuestionIdCondition: "",
					[key]: val,
				});
			} else {
				setFeedbackFilters(prev => ({ ...prev, [key]: val }));
				getProjectFeebacks({ ...feedbackFilters, [key]: val });
			}
		},
		[feedbackFilters, projectId, questions],
	);
	useEffect(() => {
		getAllCategories();
		getAllUsers();
	}, []);

	return (
		<div className="flex w-full justify-evenly">
			<div className="max-w-md w-full p-4">
				<Select
					id="categories"
					required
					onChange={e =>
						handleChangeFilters(
							"CategoryIdCondition",
							e.target.value,
						)
					}
				>
					<option className="p-2 m-2" value={""}>
						All Categories
					</option>
					{categories?.length > 0
						? categories.map(c => {
								return (
									<option
										key={c.UniqueId}
										value={c.UniqueId}
										className="p-2"
									>
										{c.Category}
									</option>
								);
							})
						: null}
				</Select>
			</div>
			<div className="max-w-md w-full p-4">
				<Select
					id="questions"
					required
					onChange={e =>
						handleChangeFilters(
							"CategoryQuestionIdCondition",
							e.target.value,
						)
					}
				>
					<option className="p-2 m-2" value={""}>
						All Questions
					</option>
					{questions?.length > 0
						? questions.map(c => {
								return (
									<option
										key={c.UniqueId}
										value={c.UniqueId}
										className="p-2"
									>
										{c.Question}
									</option>
								);
							})
						: null}
				</Select>
			</div>
			<div className="max-w-md w-full p-4">
				<Select
					id="users"
					required
					onChange={e =>
						handleChangeFilters(
							"IsAnonymousCondition",
							Number(e.target.value) === 1
								? true
								: Number(e.target.value) === 0
									? false
									: null,
						)
					}
				>
					<option className="p-2 m-2" value={""}>
						All User Type
					</option>
					<option value={1}>anonymous</option>
					<option value={0}>User</option>
				</Select>
			</div>
			<div className="max-w-md w-full p-4">
				<Select
					id="users"
					required
					onChange={e =>
						handleChangeFilters("UserIdCondition", e.target.value)
					}
				>
					<option className="p-2 m-2" value={""}>
						All Users
					</option>
					{users?.length > 0
						? users.map(c => {
								return (
									<option
										key={c.UniqueId}
										value={c.UniqueId}
										className="p-2"
									>
										{c.Fullname}
									</option>
								);
							})
						: null}
				</Select>
			</div>
		</div>
	);
};
export default FeedbackFilters;
