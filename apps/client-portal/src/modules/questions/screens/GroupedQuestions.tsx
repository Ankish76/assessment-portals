"use client";
import Card from "@components/Card";
import SingleSection from "@components/layouts/SingleSection";
import { useStore } from "@lib/zustand/store";
import ButtonWithIcon from "@root/components/ButtonWithIcon";
import { Fragment, useCallback, useEffect, useState } from "react";
import { FaEllipsis, FaPencil, FaPlus, FaTrashCan } from "react-icons/fa6";
import { TableHeaders } from "../constants";
import TableHeader from "@root/components/TableHeader";
import Tooltip from "@root/components/Tooltip";
import { Menu, Transition } from "@headlessui/react";
import Modal from "@root/components/Modal";
import AddCategory from "../../categories/form/AddCategory";
import Pager from "@root/components/Pager";
import AddQuestion from "../form/AddQuestion.";

const pageSize = 7;
const orderBy = {
	selector: "CreatedDate",
	order: "desc",
};

export default function GroupedQuestions({ category }: { category: string }) {
	const categories = useStore(m => m.categories);
	const questions = useStore(m => m.questions);
	const currentCategory = categories.find(c => c.UniqueId === category);
	const [open, setOpen] = useState<boolean>(false);

	const deleteCategory = useStore(m => m.deleteCategory);
	const [editCategory, setEditCategory] = useState<any>();
	const [page, setPage] = useState(0);
	const [openConfirmClose, setOpenConfirmClose] = useState<boolean>(false);
	const [openConfirmDelete, setOpenConfirmDelete] = useState<boolean>(false);

	const handleEditClose = useCallback(() => {
		setOpenConfirmClose(false);
		setEditCategory("");
		setOpen(false);
	}, []);

	const handleConfirmCancel = useCallback(() => {
		setOpenConfirmClose(prev => !prev);
		setOpen(true);
	}, []);
	const handleConfirmDelete = useCallback(() => {
		setOpenConfirmDelete(prev => !prev);
	}, []);
	const deleteDoc = useCallback(
		(id: string) => {
			deleteCategory(id).then(res => {
				handleConfirmDelete();
				setEditCategory("");
				setOpen(false);
			});
		},
		[deleteCategory, handleConfirmDelete],
	);
	const handleClose = useCallback(() => {
		setOpenConfirmClose(prev => !prev);
		setOpen(false);
	}, []);

	const handlePageChange = useCallback((newPage: number) => {
		setPage(newPage);
	}, []);
	const questionsData = questions?.slice(
		page * pageSize,
		pageSize * (page + 1),
	);

	return (
		<SingleSection
			title={`Questions Of ${currentCategory?.Category}`}
			backgroundColor="bg-accent"
			count={questions?.length != 0 ? questions?.length : undefined}
			button={
				<ButtonWithIcon
					onClick={() => setOpen(true)}
					classNames="border bg-dark-100 text-white border-slate-500 rounded-md w-fit h-12 px-5 text-lg flex items-center justify-around"
					icon={<FaPlus />}
					text="New"
				/>
			}
		>
			<Card bgColor="bg-white p-1 pt-3 mt-4">
				<div className="flex flex-wrap gap-1">
					<div className={`flex flex-col gap-[3px] bg-white w-full`}>
						<div
							className={`flex-col gap-[3px] mt-3 hidden xl:block lg:block`}
						>
							<div
								className={`cursor-pointer  uppercase text-xs flex leading-none mb-1 rounded`}
							>
								{TableHeaders?.map((el: any) => (
									<TableHeader
										key={el.label}
										className={el.className}
										label={el.label}
										selector={el.selector}
										highlighter={orderBy}
									/>
								))}
							</div>
						</div>
						{questionsData?.length > 0 ? (
							questionsData.map(el => {
								return (
									<div
										key={`document-${el.UniqueId}`}
										className={`lg:flex flex-row hover:bg-light-300 rounded items-center cursor-pointer bg-accent-200`}
									>
										<Tooltip
											text="Edit Category"
											key={`document-${el.UniqueId}`}
										>
											<div className="lg:flex flex-row items-center">
												<div className="flex basis-full items-center px-[10px] py-2 lg:bg-transparent bg-[#EFF2F7]">
													<div className="ml-3 my-1 basis-2/3">
														<div
															className={`font-semibold text-dark-200 text-[15px]`}
														>
															{el.Question}
														</div>
													</div>
												</div>
											</div>
										</Tooltip>
										<div className="flex sm:px-3 sm:py-3 xs:p-3 text-sm basis-1/5 lg:justify-center xl:justify-end justify-start items-center">
											<Menu as="div" className="relative">
												<div>
													<Menu.Button className="flex border bg-slate-100 border-border text-slate-500 rounded w-fit py-2 items-center justify-around px-3">
														<FaEllipsis />
													</Menu.Button>
												</div>
												<Transition
													as={Fragment}
													enter="transition ease-out duration-100"
													enterFrom="transform opacity-0 scale-95"
													enterTo="transform opacity-100 scale-100"
													leave="transition ease-in duration-75"
													leaveFrom="transform opacity-100 scale-100"
													leaveTo="transform opacity-0 scale-95"
												>
													<Menu.Items className="absolute right-0 z-20 origin-top-right rounded text-dark-100 bg-blue-400 border border-border py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none w-max cursor-pointer">
														<Menu.Item>
															<a
																className="block px-5 py-3 text-base flex items-center"
																onClick={() => {
																	setEditCategory(
																		el,
																	);
																	setOpen(
																		true,
																	);
																}}
															>
																<FaPencil className="mr-3" />
																Edit
															</a>
															{/* test */}
														</Menu.Item>
														<Menu.Item>
															<a
																className="block px-5 py-3 text-base flex items-center"
																onClick={() =>
																	handleConfirmDelete()
																}
															>
																<FaTrashCan className="mr-3" />
																Delete
															</a>
														</Menu.Item>
													</Menu.Items>
												</Transition>
											</Menu>
										</div>
									</div>
								);
							})
						) : (
							<div className="flex justify-center py-4 bg-accent text-sm text-dark-200 italic">
								No Categories.
							</div>
						)}
						<div className="mb-2 mt-2">
							<Pager
								currentPage={page}
								totalCount={questions.length}
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
					className={`xl:max-w-[576px] lg:max-w-[576px] w-full overflow-y-auto`}
				>
					<AddQuestion
						question={editCategory}
						onSubmitSuccess={handleClose}
						onDelete={handleConfirmDelete}
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
								Are you sure you want to close this Question?
							</div>
							<div className="text-red-200 font-semibold">
								Unsaved changes will be lost.
							</div>
						</div>
					</div>
					<div className=" centered flex justify-center items-center gap-1 py-4 shadow-top-inset">
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
								Are you sure you want to delete this Question?
							</div>
							<div className="text-red-200 font-semibold">
								This cannot be undone.
							</div>
						</div>
					</div>
					<div className=" centered flex justify-center items-center gap-1 py-4 shadow-top-inset">
						<button
							className="flex items-center px-4 py-2 text-md bg-red-200 text-white rounded"
							onClick={() => deleteDoc(editCategory.UniqueId)}
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
		</SingleSection>
	);
}
