import { TableHeader } from "@root/types";
import { RiskAssessmentType } from "./interfaces";

export const TableHeaders: TableHeader<RiskAssessmentType>[] = [
	{
		className: "basis-2/12 font-semibold ",
		label: "Category",
		selector: "Category",
	},
	{
		className: "basis-1/12 font-semibold ",
		label: "Risk Level",
		selector: "RiskLevel",
	},
	{
		className: "basis-1/12 font-semibold ",
		label: "Severity Level",
		selector: "SeverityLevel",
	},

	{
		className: "basis-1/12 font-semibold ",
		label: "Priority Level",
		selector: "PriorityLevel",
	},

	{
		className: "basis-1/12 font-semibold ",
		label: "Risk Descprition",
		selector: "RiskDesc",
	},

	{
		className: "basis-3/12 font-semibold ",
		label: "Mitigation",
		selector: "Mitigation",
	},
	{
		className: "basis-1/12 font-semibold ",
		label: "Action Items Owner",
		selector: "ActionItemsOwner",
	},
	{
		className: "basis-1/12 font-semibold ",
		label: "Resolved By User",
		selector: "ResolvedByUser",
	},
	{
		className: "basis-1/12 font-semibold ",
		label: "Created Date",
		selector: "CreatedDateTime",
	},

	{
		className: "basis-1/12 font-semibold ",
		label: "",
		// selector: "",
	},
];
