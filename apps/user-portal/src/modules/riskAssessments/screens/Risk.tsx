"use client";
import Modal from "@components/Modal";
import { useStore } from "@lib/zustand/store";
import { Fragment, useCallback, useEffect, useState } from "react";
import ButtonWithIcon from "@root/components/ButtonWithIcon";
import { FaEllipsis, FaPencil, FaPlus, FaTrashCan } from "react-icons/fa6";
import Card from "@root/components/Card";
import TableHeader from "@root/components/TableHeader";
import Tooltip from "@root/components/Tooltip";
import { Menu, Transition } from "@headlessui/react";
import Pager from "@root/components/Pager";
import { TableHeaders } from "../constants";
import moment from "moment";
import ListingModal from "../components/ListingModal";
import { Table } from "flowbite-react";

const pageSize = 7;
const orderBy = {
	selector: "CreatedDate",
	order: "desc",
};
const RiskList: React.FC = () => {
	const riskData = useStore(m => m.riskData);
	const getRiskData = useStore(m => m.getRiskData);

	const [open, setOpen] = useState<boolean>(false);
	const [editProject, setEditProject] = useState<any>();
	const [page, setPage] = useState(0);
	const [projectsAssessments, setprojectsAssessments] = useState(
		riskData?.slice(page * pageSize, pageSize * (page + 1)),
	);
	const [openConfirmClose, setOpenConfirmClose] = useState<boolean>(false);
	const [openConfirmDelete, setOpenConfirmDelete] = useState<boolean>(false);
	const [showAssessments, setShowAssessments] = useState<boolean>(false);
	const [uniqueId, setUniqueId] = useState<string>("");

	const handleClose = () => {
		setOpen(false);
	};

	useEffect(() => {
		setprojectsAssessments(
			riskData?.slice(page * pageSize, pageSize * (page + 1)),
		);
	}, [riskData]);

	const handlePageChange = useCallback(
		(newPage: number) => {
			setPage(newPage);
			setprojectsAssessments(
				riskData?.slice(newPage * pageSize, pageSize * (newPage + 1)),
			);
		},
		[riskData],
	);

	const handleOpen = (UniqueId: string) => {
		setUniqueId(UniqueId);
		setOpen(true);
	};
	return (
		<div className="m-6">
			<Card bgColor="bg-white p-1 pt-3 mt-4">
				<div className="flex flex-wrap gap-1 overflow-x-auto">
					<div
						className={`flex flex-col gap-[3px] bg-white w-full overflow-x-auto`}
					>
						<div className="flex items-center justify-between">
							<p className="font-semibold">
								<span className="text-[30px] font-medium pr-2">
									Action Items
								</span>
								<span className="count bg-gray-300 px-2 py-1 rounded-full font-semibold">
									{riskData.length}
								</span>
							</p>
						</div>
						<div className="overflow-x-auto mt-3 table-no-drop">
							<Table className="rounded-none">
								<Table.Head>
									{TableHeaders?.map((el: any) => (
										<Table.HeadCell
											className="bg-accent hover:bg-gray-300"
											key={el.label}
										>
											{el.label}
										</Table.HeadCell>
									))}
								</Table.Head>
								<Table.Body>
									{projectsAssessments?.length > 0
										? projectsAssessments.map(el => (
												<Table.Row
													onDoubleClick={() =>
														handleOpen(el.UniqueId)
													}
													key={el.UniqueId}
													className="hover:bg-light-300  cursor-pointer bg-accent-200 pt-2 border-y-3 border-white "
												>
													<Table.Cell className="">
														<div
															className={` text-dark-200 text-[15px]`}
														>
															{el.Category}
														</div>
													</Table.Cell>
													<Table.Cell className="">
														<div
															className={` text-dark-200 text-[15px]`}
														>
															{el.RiskLevel}
														</div>
													</Table.Cell>
													<Table.Cell>
														<div
															className={` text-dark-200 text-[15px]`}
														>
															{el.SeverityLevel}
														</div>
													</Table.Cell>

													<Table.Cell>
														<div
															className={` text-dark-200 text-[15px]`}
														>
															{el.PriorityLevel}
														</div>
													</Table.Cell>
													<Table.Cell>
														<div
															className={` text-dark-200 text-[15px]`}
														>
															{el.RiskDesc}
														</div>
													</Table.Cell>
													<Table.Cell>
														<div
															className={` text-dark-200 text-[15px]`}
														>
															{el.Mitigation}
														</div>
													</Table.Cell>

													<Table.Cell>
														<div
															className={` text-dark-200 text-[15px]`}
														>
															{el.AssessorName}
														</div>
													</Table.Cell>
													<Table.Cell>
														<div
															className={` text-dark-200 text-[15px]`}
														>
															{el.ResolvedByUser}
														</div>
													</Table.Cell>
													<Table.Cell>
														<div
															className={` text-dark-200 text-[15px]`}
														>
															{el.CreatedDateTime
																? moment(
																		el.CreatedDateTime,
																	).format(
																		"MM/DD/YYYY",
																	)
																: null}
														</div>
													</Table.Cell>
												</Table.Row>
											))
										: null}
								</Table.Body>
							</Table>
							{projectsAssessments?.length <= 0 ? (
								<div className="py-4 bg-accent text-sm text-dark-200 italic text-center mt-2">
									No Project Assessments
								</div>
							) : null}
						</div>
						<div className="mb-2 mt-2">
							<Pager
								currentPage={page}
								dataSource={riskData}
								onChangePage={handlePageChange}
								pageSize={pageSize}
							/>
						</div>
					</div>
				</div>
			</Card>
			{open ? (
				<Modal
					show={open}
					close={handleClose}
					closeOutSide={false}
					className={`xl:max-w-[576px] lg:max-w-[576px] w-full overflow-visible overflow-y-auto`}
				>
					<ListingModal
						projectsAssessments={projectsAssessments}
						uniqueId={uniqueId}
					/>
				</Modal>
			) : null}
		</div>
	);
};

export default RiskList;
