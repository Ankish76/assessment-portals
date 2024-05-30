import { useStore } from "@root/lib/zustand/store";
import QuestionReview from "../components/QuestionReview";
import Spinner from "@root/components/Spinner";

type Props = {
	CategoryId: string;
	ProjectId: string;
};
const CategoryQuestions: React.FC<Props> = ({ CategoryId, ProjectId }) => {
	const roleCategoryQuestions = useStore(m => m.roleCategoryQuestions);
	const user = localStorage.getItem("userData")
	const userId = user ? JSON.parse(user) : null;
	return (
		<>
			<div className="pt-6">
				{roleCategoryQuestions ? (
					roleCategoryQuestions?.Questions?.map(q => (
						<div
							className="p-5 m-2 mt-5 bg-light-200"
							key={q.UniqueId}
							style={{ boxShadow: "0px 1px 9px -4px" }}
						>
							<div className="py-3 text-dark-200 font-bold  mb-2">
								{q.Question}
							</div>
							<QuestionReview
								UserId={userId?.UniqueId}
								ProjectId={ProjectId}
								CategoryId={CategoryId}
								CategoryQuestionId={q.UniqueId}
							/>
						</div>
					))
				) : (
					<Spinner aria-label="Loading Questions" />
				)}
			</div>
		</>
	);
};
export default CategoryQuestions;
