import React, { useCallback, useEffect, useRef, useState } from "react";
import { useStore } from "@lib/zustand/store";
import {
	DatePicekrField,
	Form,
	SubmitButton,
	TextInputField,
} from "@root/components/AsyncForm";
import validationSchema from "./validationSchema";
import { FaCheck, FaRegTrashCan, FaTrash, FaTrashCan } from "react-icons/fa6";
import ButtonWithIcon from "@root/components/ButtonWithIcon";
import DropZone from "@root/components/DropZone";
import { IoDocumentTextOutline } from "react-icons/io5";

import { Button, Label, Select } from "flowbite-react";
import axios from "axios";
import moment from "moment";

type Props = {
	projectId: string;
	projectAssessment?: any;
	onSubmitSuccess?: () => void;
	onDelete?: (project: any) => void;
};
interface errorType {
	Details: string;
	Summary: string;
}
const AddProjectAssessment = ({
	projectId,
	projectAssessment,
	onSubmitSuccess,
	onDelete,
}: Props) => {
	const addProjectAssessmentData = useStore(m => m.addProjectAssessmentData);
	const getProjectAssessmentsData = useStore(
		m => m.getProjectAssessmentsData,
	);

	const projectStatus = useStore(m => m.projectStatus);

	const [summaryFile, setSummaryFile] = useState<File | null>();
	const [detailFile, setDetailFile] = useState<File | null>();
	const [summaryFileError, setSummaryFileError] = useState("");
	const [detailFileError, setDetailFileError] = useState("");

	const [statusValue, setStatusValue] = useState(projectStatus[0]?.UniqueId);

	const handleSave = useCallback(
		(input: any) => {
			if (!summaryFile) {
				setSummaryFileError("Summary File is required");
			}
			if (!detailFile) {
				setDetailFileError("Detail File is required");
			}
			if (summaryFile && detailFile) {
				const addAssessmentPayload = {
					...input,
					projectId: projectId,
					statusId: statusValue,
					summaryUrl: summaryFile?.name,
					detailsUrl: detailFile?.name,
				};
				addProjectAssessmentData(addAssessmentPayload);
				onSubmitSuccess && onSubmitSuccess();
				getProjectAssessmentsData();
			}
		},
		[statusValue, summaryFile, detailFile],
	);
	const handleDelete = useCallback(() => {
		if (onDelete && projectAssessment) {
			onDelete(projectAssessment);
		}
	}, [onDelete, projectAssessment]);

	const uploadFile = async (file: any) => {
		const response = await uploadFileProgress(file);
		if (response?.status == 200) {
			let requestURL: any = response?.config?.url;
			let url = requestURL.substring(0, requestURL.indexOf("?"));

			return url;
		}
	};

	const summaryFileChange = (file: any) => {
		setSummaryFile(file);
		setSummaryFileError("");
	};
	const detailFileChange = (file: any) => {
		setDetailFile(file);
		setDetailFileError("");
	};

	const uploadFileProgress = async (file: any) => {
		let { data } = await axios.post("/api/s3/upload", {
			name: `${file.name}`,
			type: file.type,
			file: file,
		});
		let requestURL = await data?.requestURL;

		return axios.put(requestURL, file, {
			headers: {
				"Content-type": file.type,
				"Access-Control-Allow-Origin": "*",
			},
			onUploadProgress: function (progressEvent: any) {
				var percentCompleted = Math.round(
					(progressEvent.loaded * 100) / progressEvent.total,
				);
			},
		});
	};

	return (
		<>
			<p className="text-[21px] py-4 font-semibold border-b px-4">
				{projectAssessment ? "Edit" : "New"} Assessment
			</p>
			<div className="pt-3 pb-8 mx-4">
				<div className="my-4">
					<div className="mb-2 block">
						<Label htmlFor="status" value="Select Status" />
					</div>
					<Select
						id="status"
						required
						name="status"
						defaultValue={projectStatus[0]?.UniqueId}
						onChange={e => setStatusValue(e.target.value)}
					>
						{projectStatus.length > 0
							? projectStatus.map(s => {
									return (
										<option
											key={s.UniqueId}
											value={s.UniqueId}
										>
											{s.Status}
										</option>
									);
								})
							: null}
					</Select>
				</div>
				<Form
					onSubmit={handleSave}
					validateOnBlur
					name="project-assessment-form"
					onSubmitSuccess={onSubmitSuccess}
					initialValues={{
						assessmentPeriodStartDate: moment(new Date()).format(
							"MM/DD/YYYY",
						),
						assessmentPeriodEndDate: moment(new Date()).format(
							"MM/DD/YYYY",
						),
					}}
					validationSchema={validationSchema()}
				>
					{({ handleSubmit }) => {
						return (
							<>
								<div className="form-wrapper">
									<TextInputField
										label="Comments"
										name="comments"
										fullWidth
										autoFocus
									/>
									<DatePicekrField
										label="Assessment Period Start Date"
										name="assessmentPeriodStartDate"
									/>
									<DatePicekrField
										label="Assessment Period End Date"
										name="assessmentPeriodEndDate"
									/>
									<Label>Summary Document</Label>
									<DropZone
										fileChange={summaryFileChange}
										className="px-0"
									/>
									<div className="flex flex-col  p-3">
										{summaryFile ? (
											<>
												<div className="w-full h-16 flex border-2 items-center justify-between rounded p-3 bg-white">
													<div className="flex flex-row items-center gap-2">
														<div className="h-12 w-12 mt-2">
															{[
																"image/png",
																"image/jpeg",
																"image/gif",
															].includes(
																summaryFile.type,
															) ? (
																<img
																	className="w-full h-full rounded"
																	src={URL.createObjectURL(
																		summaryFile,
																	)}
																/>
															) : (
																<IoDocumentTextOutline
																	color="indigo"
																	size={40}
																/>
															)}
														</div>
														<span className="truncate w-44">
															{summaryFile.name}
														</span>
													</div>
													<div
														onClick={() => {
															setSummaryFile(
																null,
															);
														}}
														className="h-12 w-12 bg-red-400 flex items-center cursor-pointer justify-center rounded-sm"
													>
														<FaRegTrashCan />
													</div>
												</div>
											</>
										) : null}
										{summaryFileError ? (
											<div className="text-red-600">
												Summary File is Required
											</div>
										) : null}
									</div>
									<Label>Details Document</Label>
									<DropZone
										fileChange={detailFileChange}
										className="px-0"
									/>
									<div className="flex flex-col p-3">
										{detailFile ? (
											<>
												<div className="w-full h-16 flex border-2 items-center justify-between rounded p-3 bg-white">
													<div className="flex flex-row items-center gap-2">
														<div className="h-12 w-12 mt-2">
															{[
																"image/png",
																"image/jpeg",
																"image/gif",
															].includes(
																detailFile.type,
															) ? (
																<img
																	className="w-full h-full rounded"
																	src={URL.createObjectURL(
																		detailFile,
																	)}
																/>
															) : (
																<IoDocumentTextOutline
																	color="indigo"
																	size={40}
																/>
															)}
														</div>
														<span className="truncate w-44">
															{detailFile.name}
														</span>
													</div>
													<div
														onClick={() => {
															setDetailFile(null);
														}}
														className="h-12 w-12 bg-red-400 flex items-center cursor-pointer justify-center rounded-sm"
													>
														<FaRegTrashCan />
													</div>
												</div>
											</>
										) : null}
										{detailFileError ? (
											<div className="text-red-600">
												Details File is Required
											</div>
										) : null}
									</div>
								</div>
								<div className="button-container flex items-center justify-center py-3 gap-[6px] border-t-2 mt-2">
									<Button
										onClick={handleSubmit}
										className="border !bg-dark-100 text-white border-slate-500 rounded-md w-fit py-1 px-3 items-center flex"
									>
										<FaCheck />
										{Boolean(projectAssessment)
											? "Update"
											: "Add"}
									</Button>
									{projectAssessment && onDelete ? (
										<ButtonWithIcon
											classNames="border bg-red-500 text-red-200 border-slate-100 rounded-md w-fit py-1 px-3 items-center justify-around"
											onClick={handleDelete}
											icon={<FaTrashCan />}
											text="Delete"
										/>
									) : null}
								</div>
							</>
						);
					}}
				</Form>
			</div>
		</>
	);
};

export default AddProjectAssessment;
