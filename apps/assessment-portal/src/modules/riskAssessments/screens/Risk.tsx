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
import AddRiskAssesments from "../form/AddRiskAssesments";
import moment from "moment";
import { Table } from "flowbite-react";

const pageSize = 3;
const orderBy = {
	selector: "CreatedDate",
	order: "desc",
};
const RiskList: React.FC = () => {
	const riskData = useStore(m => m.riskData);
	const deleteProject = useStore(m => m.deleteProject);

	const [open, setOpen] = useState<boolean>(false);
	const [editProject, setEditProject] = useState<any>();
	const [page, setPage] = useState(0);
	const [projectsAssessments, setprojectsAssessments] = useState(
		riskData?.slice(page * pageSize, pageSize * (page + 1)),
	);
	const [openConfirmClose, setOpenConfirmClose] = useState<boolean>(false);
	const [openConfirmDelete, setOpenConfirmDelete] = useState<boolean>(false);
	const [showAssessments, setShowAssessments] = useState<boolean>(false);

	const handleEdit = (UniqueId: string) => {
		const riskFilterData = riskData?.find(i => i.UniqueId === UniqueId);
		setEditProject(riskFilterData);
		setOpen(true);
	};
	const handleEditClose = () => {
		setOpenConfirmClose(false);
		setEditProject("");
		setOpen(false);
	};

	const deleteDoc = (id: string) => {
		deleteProject(id);
		handleConfirmDelete();
		setEditProject("");
		setOpen(false);
	};

	useEffect(() => {
		setprojectsAssessments(
			riskData?.slice(page * pageSize, pageSize * (page + 1)),
		);
	}, [riskData]);

	const handleConfirmCancel = () => {
		setOpenConfirmClose(!openConfirmClose);
	};
	const handleConfirmDelete = () => {
		setOpenConfirmDelete(!openConfirmDelete);
	};

	const handlePageChange = useCallback(
		(newPage: number) => {
			setPage(newPage);
			setprojectsAssessments(
				riskData?.slice(newPage * pageSize, pageSize * (newPage + 1)),
			);
		},
		[riskData],
	);
	const handleClose = useCallback(() => {
		setEditProject("");
		setOpen(false);
	}, []);

	const handleShowAssessment = useCallback(() => {
		setShowAssessments(prev => !prev);
	}, []);

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
									Risk
								</span>
								<span className="count bg-gray-300 px-2 py-1 rounded-full font-semibold">
									{riskData?.length}
								</span>
							</p>
							<ButtonWithIcon
								onClick={() => setOpen(true)}
								classNames=" self-end border bg-dark-100 text-white border-slate-500 rounded-md w-fit h-12 px-5 text-lg flex items-center justify-around"
								icon={<FaPlus />}
								text="New"
							/>
						</div>
						<div className="overflow-x-auto mt-3 table-no-drop">
							<Table className="rounded-none ">
								<Table.Head>
									{TableHeaders?.map((el: any) => (
										<Table.HeadCell
											className="bg-accent hover:bg-gray-300 !rounded-none"
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
														handleEdit(el.UniqueId)
													}
													key={el.UniqueId}
													className="hover:bg-light-300  cursor-pointer bg-accent-200 pt-2 border-y-3 border-white "
												>
													<Table.Cell className="py-1">
														<div
															className={` text-dark-200 text-[15px]`}
														>
															{el.Category}
														</div>
													</Table.Cell>
													<Table.Cell className="py-1">
														<div
															className={` text-dark-200 text-[15px]`}
														>
															{el.RiskLevel}
														</div>
													</Table.Cell>
													<Table.Cell className="py-1">
														<div
															className={` text-dark-200 text-[15px]`}
														>
															{el.SeverityLevel}
														</div>
													</Table.Cell>

													<Table.Cell className="py-1">
														<div
															className={` text-dark-200 text-[15px]`}
														>
															{el.PriorityLevel}
														</div>
													</Table.Cell>
													<Table.Cell className="py-1">
														<div
															className={` text-dark-200 text-[15px]`}
														>
															{el.RiskDesc}
														</div>
													</Table.Cell>
													<Table.Cell className="py-1">
														<div
															className={` text-dark-200 text-[15px]`}
														>
															{el.Mitigation}
														</div>
													</Table.Cell>

													<Table.Cell className="py-1">
														<div
															className={` text-dark-200 text-[15px]`}
														>
															{
																el.ActionItemsOwner
															}
														</div>
													</Table.Cell>
													<Table.Cell className="py-1">
														<div
															className={` text-dark-200 text-[15px]`}
														>
															{el.ResolvedByUser}
														</div>
													</Table.Cell>
													<Table.Cell className="py-1">
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
													<Table.Cell className="py-1">
														<div className="flex sm:px-3 sm:py-3 xs:p-3 text-sm basis-1/12 lg:justify-center xl:justify-end justify-start items-center">
															<Menu
																as="div"
																className="relative"
															>
																<div>
																	<Menu.Button className="flex border bg-slate-100 border-border text-slate-500 rounded w-fit py-2 items-center justify-around px-3">
																		<FaEllipsis />
																	</Menu.Button>
																</div>
																<Transition
																	as={
																		Fragment
																	}
																	enter="transition ease-out duration-100"
																	enterFrom="transform opacity-0 scale-95"
																	enterTo="transform opacity-100 scale-100"
																	leave="transition ease-in duration-75"
																	leaveFrom="transform opacity-100 scale-100"
																	leaveTo="transform opacity-0 scale-95"
																>
																	<Menu.Items className="absolute right-0 z-10 origin-top-right rounded text-dark-100 bg-blue-400 border border-border py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none w-max cursor-pointer">
																		<Menu.Item>
																			<a
																				className=" px-5 py-3 text-base flex items-center"
																				onClick={() =>
																					handleEdit(
																						el.UniqueId,
																					)
																				}
																			>
																				<FaPencil className="mr-3" />
																				Edit
																			</a>
																		</Menu.Item>
																		{/* <Menu.Item>
                                                            <a
                                                                className="block px-5 py-3 text-base flex items-center"
                                                                onClick={() =>
                                                                    // handleConfirmDelete()
                                                                    console.log(
                                                                        "handle Delete",
                                                                    )
                                                                }
                                                            >
                                                                <FaTrashCan className="mr-3" />
                                                                Delete
                                                            </a>
                                                        </Menu.Item> */}
																	</Menu.Items>
																</Transition>
															</Menu>
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
								totalCount={riskData.length}
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
					<AddRiskAssesments
						projectId={riskData[0].ProjectId}
						riskProjectAssessment={editProject}
						onSubmitSuccess={handleClose}
						// onDelete={handleConfirmDelete}
					/>
				</Modal>
			) : null}
			{openConfirmClose ? (
				<Modal
					show={openConfirmClose}
					close={handleConfirmCancel}
					className={`xl:max-w-[576px] lg:max-w-[576px] w-full overflow-y-auto`}
				>
					<div className="py-6">
						<div className="flex flex-col justify-center gap-2 text-center mt-6 text-lg">
							<div>
								Are you sure you want to close this document?
							</div>
							<div className="text-red-200 font-semibold">
								Unsaved changes will be lost.
							</div>
						</div>
					</div>
					<div className="centered flex justify-center items-center gap-1 py-4 shadow-top-inset">
						<button
							className="flex items-center px-4 py-2 text-md bg-red-200 text-white rounded"
							onClick={handleEditClose}
						>
							Close
						</button>
						<button
							className="flex items-center px-4 py-2 text-md bg-dark-100 text-white rounded"
							onClick={handleConfirmCancel}
						>
							Cancel
						</button>
					</div>
				</Modal>
			) : null}
			{openConfirmDelete ? (
				<Modal
					show={openConfirmDelete}
					close={handleConfirmDelete}
					className={`xl:max-w-[576px] lg:max-w-[576px] w-full overflow-y-auto`}
				>
					<div className="py-6">
						<div className="flex flex-col justify-center gap-2 text-center mt-6 text-lg">
							<div>
								Are you sure you want to delete this Project?
							</div>
							<div className="text-red-200 font-semibold">
								This cannot be undone.
							</div>
						</div>
					</div>
					<div className=" centered flex justify-center items-center gap-1 py-4 shadow-top-inset">
						<button
							className="flex items-center px-4 py-2 text-md bg-red-200 text-white rounded"
							onClick={() => deleteDoc(editProject.UniqueId)}
						>
							Delete
						</button>
						<button
							className="flex items-center px-4 py-2 text-md bg-dark-100 text-white rounded"
							onClick={handleConfirmDelete}
						>
							Cancel
						</button>
					</div>
				</Modal>
			) : null}
		</div>
	);
};

export default RiskList;
