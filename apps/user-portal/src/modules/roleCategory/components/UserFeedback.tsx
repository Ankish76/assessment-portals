import { useStore } from "@root/lib/zustand/store";
import { FeedbackParamsPropType } from "../interfaces";
import { FaChevronDown, FaChevronUp } from "react-icons/fa6";
import Review from "@root/components/Rating";
import { Avatar, Button } from "flowbite-react";
import { BsIncognito } from "react-icons/bs";

const UserFeedback = ({
	UserId,
	CategoryId,
	ProjectId,
	CategoryQuestionId,
	showFullDetails,
	setShowFullDetails,
}: FeedbackParamsPropType) => {
	const questionFeedbacks = useStore(m => m.questionFeedbacks);
	const getUserFeedbacks = useStore(m => m.getUserFeedbacks);
	const handleShowMore = () => {
		if (!showFullDetails) {
			getUserFeedbacks({
				UserId,
				CategoryId,
				CategoryQuestionId,
				ProjectId,
			});
			setShowFullDetails(true);
		} else {
			setShowFullDetails(false);
		}
	};
	return (
		<>
			<button
				className="flex my-5 text-sm items-center justify-center h-8 px-3 text-gray-600 border border-gray-500 rounded hover:bg-gray-100 mr-1"
				type="button"
				onClick={handleShowMore}
			>
				{showFullDetails ? <FaChevronUp /> : <FaChevronDown />}
				&nbsp;
				{showFullDetails ? "Show Less" : "Show All Comments"}
			</button>
			{showFullDetails ? (
				<div className="bg-gray-200 p-5">
					<hr />
					<p className="mb-3 text-lg text-gray-500">Comments</p>
					{questionFeedbacks[CategoryQuestionId]?.length > 0 ? (
						questionFeedbacks[CategoryQuestionId].sort((a, b) => {
							const dateA = new Date(a.ResponseDateTime);
							const dateB = new Date(b.ResponseDateTime);
							return dateB.getTime() - dateA.getTime();
						}).map(q => (
							<div
								className="flex items-center mb-5"
								key={q.UniqueId}
							>
								<div className="mr-5 p-0.5">
									{/* <Avatar img="/assets/images/user.jpg" alt="avatar" rounded /> */}
									{q.IsAnonymous ? (
										<Button className="rounded-full w-11">
											<BsIncognito size="20px" />
										</Button>
									) : (
										<Avatar
											img="/assets/images/user.jpg"
											alt="avatar"
											rounded
											className="w-11"
										/>
									)}
								</div>
								<Review
									commentValue={q.Comments}
									isReadOnly={true}
									key={q.UniqueId}
									ratingValue={Number(q.Rating) || 0}
									dateTime={q.ResponseDateTime}
								/>
							</div>
						))
					) : (
						<p className="italic text-sm font-normal">
							No Comments Found
						</p>
					)}
				</div>
			) : null}
		</>
	);
};
export default UserFeedback;
