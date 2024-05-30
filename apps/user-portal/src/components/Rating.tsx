import { Avatar, Button } from "flowbite-react";
import React, { useCallback, useState } from "react";
import { FaArrowUp, FaCheck, FaChevronUp, FaPencil, FaRegStar, FaStar } from "react-icons/fa6";
import { BsIncognito } from "react-icons/bs";
import { MdOutlineArrowCircleUp } from "react-icons/md";
import moment from "moment";

type Props = {
	reviewChanged?: (
		rating: number | null,
		isAnonymous: boolean,
		comment?: string,
	) => void;
	ratingValue?: number;
	isReadOnly?: boolean;
	commentValue?: string;
	dateTime?:string;
};
const Review: React.FC<Props> = ({
	reviewChanged,
	ratingValue = 0,
	isReadOnly = false,
	commentValue = "",
	dateTime,

}) => {
	const [rating, setRating] = useState<number | null>(ratingValue);
	const [inputValue, setInputValue] = useState(commentValue);
	const [isEdit, setIsEdit] = useState(false);
	const ratings = Array.from(new Array(5), (x, i) => i + 1);
	const [isAnonymous, setIsAnonymous] = useState<boolean>(false);

	const handleSubmit = () => {
		setIsEdit(!isEdit);
		if (isEdit)
			reviewChanged && reviewChanged(rating, isAnonymous, inputValue);
			setRating(null)
			setInputValue("")
	};
	const rate = (rating: number | null, note: string | null) => {
		setRating(rating);
	};

	const togglIsAnonymous = useCallback(() => {
		setIsAnonymous(prev => !prev);
	}, []);
	return (
		<div className="w-full">
			<div className="" style={{ width: "400px" }}>
				<div className="flex items-center mt-2 mb-4">
					{ratings.map((r, i) => (
						<button
							disabled={isReadOnly}
							key={`rating${i}`}
							className="text-onekey-100 pr-1"
							onClick={e => {
								rate(r, inputValue);
								e.stopPropagation();
							}}
						>
							{rating! >= r ? (
								<FaStar color="#48576A" />
							) : (
								<FaRegStar />
							)}
						</button>
					))}
					{dateTime && 
					<div className="ml-2 text-xs text-client-100">
						{moment(dateTime,).format("ll",)}
					</div>}
				</div>
				<div className="block">
					{isEdit && !isReadOnly ? (
						<>
						<div className="flex items-center border-2 ">
							<div
								onClick={togglIsAnonymous}
								className="cursor-pointer bg-white p-1 pl-2"
							>
								{isAnonymous ? (
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
							<input
								className="rounded-md w-full p-2 text-xs h-12 border-0 focus:outline-0"
								value={inputValue}
								onChange={e => setInputValue(e.target.value)}
								placeholder={
									isAnonymous
										? "Comment Anonymously"
										: "Comment Publicly"
								}
							/>
							{!isReadOnly ? (
								<div className="h-12 bg-white flex items-center p-1">
									<div className="w-12 h-full rounded-full bg-[#c1f9ea] flex justify-center items-center cursor-pointer">
									<FaArrowUp size={18} color="#155e75" className="" onClick={handleSubmit} />
									</div>
								</div>)
								: null}
						</div>
						<div className="flex items-center text-xs mt-1 font-normal"><span className="font-semibold">Pro tip</span>: press
						 <div className="w-5 h-5 rounded-full bg-[#c1f9ea] flex justify-center items-center cursor-pointer mx-2">
									<FaArrowUp size={12} color="#155e75" onClick={handleSubmit} />
									</div>to comment</div>
						</>
					) : inputValue && inputValue !== "null" ? (
						<p className="mt-2 text-xs text-client-100">
							{inputValue}
						</p>
					) : null}
					
					{!isReadOnly && !isEdit ? (
						<div className="pt-4">
							<button
								onClick={handleSubmit}
								className={`border border-membio-light-300 ${isEdit ? "bg-client-100" : "bg-gray-200"} ${isEdit ? "text-white" : "text-client-100"} px-4 py-1 rounded-md flex items-center text-xs`}
							>
								{isEdit ? (
									<FaCheck className="mr-2" size="10" />
								) : (
									<FaPencil className="mr-2" size="10" />
								)}
								{isEdit ? "Done" : "Add Comment"}
							</button>
						</div>
					) : null}
				</div>
			</div>
		</div>
	);
};

export default Review;
