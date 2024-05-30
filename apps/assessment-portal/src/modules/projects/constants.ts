import { TableHeader } from "@root/types";
import { Project } from "./interfaces";

export const TableHeaders: TableHeader<Project>[] = [
	{
		className: "basis-2/12 font-semibold",
		label: "Project",
		selector: "ProjectName",
	},
	{
		className: "basis-2/12 font-semibold",
		label: "Description",
		selector: "ProjectDesc",
	},
	{
		className: "basis-1/12 font-semibold",
		label: "Capacity Planned",
		selector: "CapacityPlanned",
	},
	{
		className: "basis-1/12 font-semibold",
		label: "Capacity Used",
		selector: "CapacityUsed",
	},
	{
		className: "basis-1/12 font-semibold",
		label: "Planned Delivery Date",
		selector: "PlannedDeliveryDate",
	},
	{
		className: "basis-1/12 font-semibold",
		label: "NewDelivery Date",
		selector: "NewDeliveryDate",
	},
	{
		className: "basis-1/12 font-semibold",
		label: "Work Planned",
		selector: "WorkPlanned",
	},
	{
		className: "basis-1/12 font-semibold",
		label: "Work Completed",
		selector: "WorkCompleted",
	},
	{
		className: "basis-1/12 font-semibold",
		label: "Budget Planned",
		selector: "BudgetPlanned",
	},
	{
		className: "basis-1/12 font-semibold",
		label: "Budget Used",
		selector: "BudgetUsed",
	},
	{
		className: "basis-1/12 font-semibold",
		label: "",
	},
];
