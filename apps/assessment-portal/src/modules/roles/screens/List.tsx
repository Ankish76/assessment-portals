"use client";
import Card from "@components/Card";
import Modal from "@components/Modal";
import Pager from "@components/Pager";
import TableHeader from "@components/TableHeader";
import Tooltip from "@components/Tooltip";
import SingleSection from "@components/layouts/SingleSection";
import AddRole from "@modules/roles/form/AddRole";
import { TableHeaders } from "@modules/roles/PropData";
import { Fragment, useCallback, useState } from "react";
import ButtonWithIcon from "@root/components/ButtonWithIcon";
import { FaEllipsis, FaPencil, FaPlus, FaTrashCan } from "react-icons/fa6";
import { useStore } from "@lib/zustand/store";
import { Menu, Transition } from "@headlessui/react";

const pageSize = 7;
const orderBy = {
	selector: "CreatedDate",
	order: "desc",
};

export default function RoleList() {
	const roles = useStore(m => m.roles);
	const deleteRole = useStore(m => m.deleteRole);
	const [open, setOpen] = useState<boolean>(false);
	const [editRole, setEditRole] = useState<any>();
	const [page, setPage] = useState(0);
	const [openConfirmClose, setOpenConfirmClose] = useState<boolean>(false);
	const [openConfirmDelete, setOpenConfirmDelete] = useState<boolean>(false);

	const handleEditClose = () => {
		setEditRole("");
		setOpen(false);
	};

	const deleteRoleData = (id: string) => {
		deleteRole(id);
		handleConfirmDelete();
		setEditRole("");
		setOpen(false);
	};

	const handleConfirmCancel = () => {
		setOpenConfirmClose(!openConfirmClose);
	};
	const handleConfirmDelete = () => {
		setOpenConfirmDelete(!openConfirmDelete);
	};

	const handlePageChange = useCallback((newPage: number) => {
		setPage(newPage);
	}, []);
	const rolesData = roles?.slice(page * pageSize, pageSize * (page + 1));
	return (
		<SingleSection
			title="Roles"
			backgroundColor="bg-accent"
			count={roles?.length != 0 && roles?.length}
			button={
				<ButtonWithIcon
					onClick={() => setOpen(true)}
					classNames="border bg-dark-100 text-white border-slate-500 rounded-md w-fit h-12 px-5 text-lg flex items-center justify-around"
					text="New"
					icon={<FaPlus />}
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
								{TableHeaders?.map(el => (
									<TableHeader
										key={el.label}
										className={el.className}
										label={el.label}
										selector={el?.selector || ""}
										highlighter={orderBy}
									/>
								))}
							</div>
						</div>
						{rolesData?.length > 0 ? (
							rolesData.map(el => {
								return (
									<div
										key={`document-${el.UniqueId}`}
										className={`lg:flex flex-row hover:bg-light-300 rounded items-center cursor-pointer bg-accent-200`}
									>
										<Tooltip
											text="Edit Role"
											key={`document-${el.UniqueId}`}
										>
											<div className="lg:flex flex-row items-center">
												<div className="flex basis-full items-center px-[10px] py-2 lg:bg-transparent bg-[#EFF2F7]">
													<div className="ml-3 my-1 basis-2/5">
														<div
															className={`font-semibold text-dark-200 text-[15px]`}
														>
															{el.Role}
														</div>
													</div>
													<div className="ml-3 my-1 basis-2/5">
														<div
															className={`font-semibold text-dark-200 text-[15px]`}
														>
															{el.Desc}
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
													<Menu.Items className="absolute right-0 z-10 origin-top-right rounded text-dark-100 bg-blue-400 border border-border py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none w-max cursor-pointer">
														<Menu.Item>
															<a
																className="block px-5 py-3 text-base flex items-center"
																onClick={() => {
																	setEditRole(
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
								No Roles.
							</div>
						)}
						<div className="mb-2 mt-2">
							<Pager
								currentPage={page}
								totalCount={roles.length}
								onChangePage={handlePageChange}
								pageSize={pageSize}
								key="pager"
							/>
						</div>
					</div>
				</div>
			</Card>
			{open ? (
				<Modal
					show={open}
					close={() => {
						setEditRole("");
						setOpen(false);
					}}
					closeOutSide={false}
					className={`xl:max-w-[576px] lg:max-w-[576px] w-full overflow-y-auto`}
				>
					<AddRole
						roleData={editRole}
						close={() => {
							setEditRole("");
							setOpen(false);
						}}
						deleteRole={() => handleConfirmDelete()}
					/>
				</Modal>
			) : null}
			{openConfirmClose ? (
				<Modal
					show={openConfirmClose}
					close={() => handleConfirmCancel()}
					className={`xl:max-w-[576px] lg:max-w-[576px] w-full overflow-y-auto`}
				>
					<div className="py-6">
						<div className="flex flex-col justify-center gap-2 text-center mt-6 text-lg">
							<div>Are you sure you want to close this Role?</div>
							<div className="text-red-200 font-semibold">
								Unsaved changes will be lost.
							</div>
						</div>
					</div>
					<div className=" centered flex justify-center items-center gap-1 py-4 shadow-top-inset">
						<button
							className="flex items-center px-4 py-2 text-md bg-red-200 text-white rounded"
							onClick={() => handleEditClose()}
						>
							Close
						</button>
						<button
							className="flex items-center px-4 py-2 text-md bg-dark-100 text-white rounded"
							onClick={() => handleConfirmCancel()}
						>
							Cancel
						</button>
					</div>
				</Modal>
			) : null}
			{openConfirmDelete ? (
				<Modal
					show={openConfirmDelete}
					close={() => handleConfirmDelete()}
					className={`xl:max-w-[576px] lg:max-w-[576px] w-full overflow-y-auto`}
				>
					<div className="py-6">
						<div className="flex flex-col justify-center gap-2 text-center mt-6 text-lg">
							<div>
								Are you sure you want to delete this Role?
							</div>
							<div className="text-red-200 font-semibold">
								This cannot be undone.
							</div>
						</div>
					</div>
					<div className=" centered flex justify-center items-center gap-1 py-4 shadow-top-inset">
						<button
							className="flex items-center px-4 py-2 text-md bg-red-200 text-white rounded"
							onClick={() => deleteRoleData(editRole.UniqueId)}
						>
							Delete
						</button>
						<button
							className="flex items-center px-4 py-2 text-md bg-dark-100 text-white rounded"
							onClick={() => handleConfirmDelete()}
						>
							Cancel
						</button>
					</div>
				</Modal>
			) : null}
		</SingleSection>
	);
}
