import { TableHeader } from "@root/types";
import { ProjectAssessmentType } from "./interfaces";

export const TableHeaders: TableHeader<ProjectAssessmentType>[] = [
	{
		className: "basis-3/12 font-semibold",
		label: "Status",
		selector: "Status",
	},
	{
		className: "basis-3/12 font-semibold",
		label: "Comments",
		selector: "Comments",
	},
	{
		className: "basis-3/12 font-semibold",
		label: "Start Date",
		selector: "AssessmentPeriodStartDate",
	},
	{
		className: "basis-3/12 font-semibold",
		label: "End Date",
		selector: "AssessmentPeriodEndDate",
	},
	{
		className: "basis-3/12 font-semibold",
		label: "Summary Url",
		selector: "SummaryUrl",
	},
	{
		className: "basis-3/12 font-semibold",
		label: "Details Url",
		selector: "DetailsUrl",
	},
];
