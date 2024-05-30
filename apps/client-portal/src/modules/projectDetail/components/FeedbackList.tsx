"use client";
import Card from "@components/Card";
import Pager from "@components/Pager";
import TableHeader from "@components/TableHeader";
import Tooltip from "@components/Tooltip";
import SingleSection from "@components/layouts/SingleSection";
import { TableHeaders } from "../constants";
import { useStore } from "@lib/zustand/store";
import { useCallback, useState } from "react";
import FeedbackFilters from "./FeedbackFilters";
import { FaRegStar, FaStar } from "react-icons/fa6";
import { BsIncognito } from "react-icons/bs";
import { Avatar, Button } from "flowbite-react";
import { FaStarHalfAlt } from "react-icons/fa";

const pageSize = 7;
const orderBy = {
	selector: "CreatedDate",
	order: "desc",
};
const FeedbackList: React.FC<{ projectId: string }> = ({ projectId }) => {
	const projectFeedbacks = useStore(m => m.projectFeedbacks);
	const categories = useStore(m => m.categories);
	const questions = useStore(m => m.questions);
	const [page, setPage] = useState(0);
	const handlePageChange = useCallback((newPage: number) => {
		setPage(newPage);
	}, []);
	const ratings = Array.from(new Array(5), (x, i) => i + 1);

	const feedbackData = projectFeedbacks?.slice(
		page * pageSize,
		pageSize * (page + 1),
	);
	return (
		<SingleSection
			title="Rating & Comments"
			backgroundColor="bg-accent"
			count={
				projectFeedbacks?.length != 0
					? projectFeedbacks?.length
					: undefined
			}
		>
			<Card bgColor="bg-white p-1 pt-3 mt-4">
				<FeedbackFilters projectId={projectId} />
				<div className="flex flex-wrap gap-1">
					<div className={`flex flex-col gap-[3px] bg-white w-full`}>
						<div
							className={`flex-col gap-[3px] mt-3 hidden xl:block lg:block`}
						>
							<div
								className={`cursor-pointer  uppercase text-xs flex leading-none mb-1 rounded`}
							>
								{TableHeaders?.map((el: any) => (
									<>
										<TableHeader
											key={el.label}
											className={el.className}
											label={el.label}
											selector={el.selector}
											highlighter={orderBy}
										/>
									</>
								))}
							</div>
						</div>
						{feedbackData?.length > 0 ? (
							feedbackData.map(el => {
								return (
									<div
										key={`document-${el.UniqueId}`}
										className={`lg:flex flex-row hover:bg-light-300 rounded items-center cursor-pointer bg-accent-200`}
									>
										<Tooltip
											text="Feedback"
											key={`document-${el.UniqueId}`}
										>
											<div className="lg:flex flex-row items-center">
												<div className="flex basis-full items-center px-[10px] py-2 lg:bg-transparent bg-[#EFF2F7]">
													<div className="ml-3 my-1 basis-1/5">
														<div
															className={`font-semibold text-dark-200 text-[15px]`}
														>
															{el.CategoryName}
														</div>
													</div>
													<div className="ml-3 my-1 basis-1/5">
														<div
															className={`font-semibold text-dark-200 text-[15px]`}
														>
															{
																el.CategoryQuestion
															}
														</div>
													</div>
													<div className="ml-3 my-1 basis-1/5">
														<div
															className={`font-semibold text-dark-200 text-[15px]`}
														>
															{el.Comments}
														</div>
													</div>
													<div className="ml-3 my-1 basis-1/5">
														<div
															className={`font-semibold text-dark-200 text-[15px]`}
														>
															{ratings.map(
																(r, i) => (
																	<button
																		disabled
																		key={`rating${i}`}
																		className="text-onekey-100 pr-1"
																	>
																		{Number(
																			el?.Rating,
																		)! >=
																		r ? (
																			<FaStar color="#ffca28" />
																		) : (
																			<FaRegStar color="#ffca28" />
																		)}
																	</button>
																),
															)}
														</div>
													</div>
													<div className="ml-3 my-1 basis-1/5">
														<div
															className={`font-semibold text-dark-200 text-[15px] flex items-center`}
														>
															{el.IsAnonymous ? (
																<Button className="rounded-full w-9 h-9 bg-[#6c8795]">
																	<BsIncognito size="18px" />
																</Button>
															) : (
																<div className="bg-[#39375b] w-8 h-8 flex items-center justify-center  rounded-full">
																	<div className="text-white font-semibold">
																		{el.UserName.split(
																			" ",
																		).map(
																			word =>
																				word.charAt(
																					0,
																				),
																		)}
																	</div>
																</div>
															)}
															&nbsp;&nbsp;&nbsp;
															{el.UserName}
														</div>
													</div>
													{/* <div className="ml-3 my-1 basis-1/5">
														<div
															className={`font-semibold text-dark-200 text-[15px]`}
														>
															{el.IsAnonymous
																? "Yes"
																: "No"}
														</div>
													</div> */}
												</div>
											</div>
										</Tooltip>
									</div>
								);
							})
						) : (
							<div className="flex justify-center py-4 bg-accent text-sm text-dark-200 italic">
								No Categories.
							</div>
						)}
						{projectFeedbacks?.length > 0 ? (
							<div className="mb-2 mt-2">
								<Pager
									currentPage={page}
									totalCount={projectFeedbacks?.length}
									onChangePage={handlePageChange}
									pageSize={pageSize}
								/>
							</div>
						) : null}
					</div>
				</div>
			</Card>
		</SingleSection>
	);
};

export default FeedbackList;
