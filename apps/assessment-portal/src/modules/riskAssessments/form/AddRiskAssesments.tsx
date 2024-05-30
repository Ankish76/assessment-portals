import React, { useCallback, useEffect, useState } from "react";
import { useStore } from "@lib/zustand/store";
import { Form, SubmitButton, TextInputField } from "@root/components/AsyncForm";
import { FaCheck } from "react-icons/fa6";
import { Label, Select } from "flowbite-react";
import moment from "moment";
import validationSchema from "./validationSchema";

type Props = {
	projectId: string;
	riskProjectAssessment?: any;
	onSubmitSuccess?: () => void;
	onDelete?: (project: any) => void;
};

const AddRiskAssesments = ({
	projectId,
	riskProjectAssessment,
	onSubmitSuccess,
}: Props) => {
	const addRiskAssessmentData = useStore(m => m.addRiskAssessmentData);
	const updateAssessmentProjectRisk = useStore(
		m => m.updateAssessmentProjectRisk,
	);
	const getRiskData = useStore(m => m.getRiskData);
	const riskLevels = useStore(m => m.riskLevels);
	const severityLevels = useStore(m => m.severityLevels);
	const priorityLevels = useStore(m => m.priorityLevels);

	const [priorityLevel, setPriorityLevel] = useState<string>();
	const [riskLevel, setRiskLevel] = useState<string>();
	const [severityLevelData, setSeverityLevelData] = useState<string>();

	const handleSave = useCallback(
		(input: any) => {
			const RiskaddAssessmentPayload = {
				...input,
				ActionItemsOwnerId: riskProjectAssessment
					? riskProjectAssessment.ActionItemsOwnerId
					: "",
				UniqueId: riskProjectAssessment
					? riskProjectAssessment.UniqueId
					: "",
				ProjectId: projectId,
				PriorityLevel: !priorityLevel
					? riskProjectAssessment?.PriorityLevelId
					: priorityLevel,
				RiskLevel: !riskLevel
					? riskProjectAssessment?.RiskLevelId
					: riskLevel,
				SeverityLevel: !severityLevelData
					? riskProjectAssessment?.SeverityLevelId
					: severityLevelData,
			};
			if (!riskProjectAssessment) {
				addRiskAssessmentData(RiskaddAssessmentPayload);
			} else {
				updateAssessmentProjectRisk(RiskaddAssessmentPayload);
			}
			onSubmitSuccess && onSubmitSuccess();
			getRiskData();
		},
		[priorityLevel, riskLevel, severityLevelData],
	);
	useEffect(() => {
		getRiskData();
	}, []);
	return (
		<>
			<p className="text-[21px] py-4 font-semibold border-b px-4">
				{riskProjectAssessment ? "Edit" : "New"} Risk Assessment
			</p>
			<div className="pt-3 pb-8 mx-4">
				<div className="my-4">
					<div className="mb-2 block">
						<Label htmlFor="status" value="Select PriorityLevel" />
					</div>
					<Select
						id="priorityLevel"
						required
						name="priorityLevel"
						defaultValue={
							riskProjectAssessment
								? riskProjectAssessment?.PriorityLevelId
								: ""
						}
						onChange={e => setPriorityLevel(e.target.value)}
					>
						{priorityLevels.length > 0
							? priorityLevels.map((s: any) => {
									return (
										<option
											key={s.UniqueId}
											value={s.UniqueId}
										>
											{s.PriorityLevel}
										</option>
									);
								})
							: null}
					</Select>
					<div className="my-2 block">
						<Label htmlFor="status" value="Select RiskLevel" />
					</div>
					<Select
						id="riskLevel"
						required
						name="riskLevel"
						defaultValue={
							riskProjectAssessment
								? riskProjectAssessment?.RiskLevelId
								: ""
						}
						onChange={e => setRiskLevel(e.target.value)}
					>
						{riskLevels.length > 0
							? riskLevels.map((s: any) => {
									return (
										<option
											key={s.UniqueId}
											value={s.UniqueId}
										>
											{s.RiskLevel}
										</option>
									);
								})
							: null}
					</Select>
					<div className="my-2 block">
						<Label htmlFor="status" value="Select Severity Level" />
					</div>
					<Select
						id="severityLevelId"
						required
						name="severityLevelId"
						defaultValue={
							riskProjectAssessment
								? riskProjectAssessment?.SeverityLevelId
								: ""
						}
						onChange={e => setSeverityLevelData(e.target.value)}
					>
						{severityLevels.length > 0
							? severityLevels.map((s: any) => {
									return (
										<option
											key={s.UniqueId}
											value={s.UniqueId}
										>
											{s.SeverityLevel}
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
						ActionItems: riskProjectAssessment
							? riskProjectAssessment?.ActionItems
							: "",
						Mitigation: riskProjectAssessment
							? riskProjectAssessment?.Mitigation
							: "",
						RiskDesc: riskProjectAssessment
							? riskProjectAssessment?.RiskDesc
							: "",
					}}
					validationSchema={validationSchema()}
				>
					{() => {
						return (
							<>
								<div className="form-wrapper">
									<TextInputField
										label={"ActionItems"}
										name={"ActionItems"}
										fullWidth
										autoFocus
									/>
									<TextInputField
										label={"Mitigation"}
										name={"Mitigation"}
										fullWidth
										autoFocus
									/>
									<TextInputField
										label={"Risk Descpriton"}
										name={"RiskDesc"}
										fullWidth
										autoFocus
									/>
								</div>
								<div className="button-container flex items-center justify-center py-3 gap-[6px] border-t-2 mt-2">
									<SubmitButton
										pt={2}
										className="border !bg-dark-100 text-white border-slate-500 rounded-md w-fit py-1 px-3 items-center flex"
									>
										<FaCheck />
										{Boolean(riskProjectAssessment)
											? "Update"
											: "Add"}
									</SubmitButton>
								</div>
							</>
						);
					}}
				</Form>
			</div>
		</>
	);
};

export default AddRiskAssesments;
