import { useCallback, useState } from "react";
import {  GetFeedbackType } from "../interfaces";
import { useStore } from "@root/lib/zustand/store";
import Review from "@root/components/Rating";
import UserFeedback from "./UserFeedback";

const QuestionReview = ({
	UserId,
	CategoryId,
	ProjectId,
	CategoryQuestionId,
}: GetFeedbackType) => {
	const addUserFeedback = useStore(m => m.addUserFeedback);
	const [showFullDetails, setShowFullDetails] = useState<boolean>(false);

	const handleReviewChange = useCallback(
		(rating: number | null,isAnonymous: boolean, comment?: string ) => {			
			addUserFeedback({
				CategoryId: CategoryId,
				CategoryQuestionId: CategoryQuestionId,
				ProjectId: ProjectId,
				UserId: UserId,
				comment: comment || "",
				rating: rating || 0,
				isAnonymous: isAnonymous
			});
			setShowFullDetails(false)
		},
		[],
	);

	return (
		<>
			<Review reviewChanged={handleReviewChange} />
			<UserFeedback
				UserId={UserId}
				ProjectId={ProjectId}
				CategoryId={CategoryId}
				CategoryQuestionId={CategoryQuestionId}
				showFullDetails={showFullDetails}
				setShowFullDetails={setShowFullDetails}
			/>
		</>
	);
};
export default QuestionReview;
