import { TableHeader } from "@root/types";
import { ProjectFeedback } from "./interfaces";

export const TableHeaders: TableHeader<ProjectFeedback>[] = [
	{
		className: "basis-1/5 font-semibold",
		label: "Category",
		selector: "CategoryName",
	},
	{
		className: "basis-1/5 font-semibold",
		label: "Question",
		selector: "CategoryQuestion",
	},
	{
		className: "basis-1/5 font-semibold",
		label: "Comments",
		selector: "Comments",
	},
	{
		className: "basis-1/5 font-semibold",
		label: "Rating",
		selector: "Rating",
	},
	{
		className: "basis-1/5 font-semibold",
		label: "User",
		selector: "UserName",
	},
	
	
	// {
	// 	className: "basis-1/5 font-semibold",
	// 	label: "Is Anonymous",
	// 	selector: "IsAnonymous",
	// },

	
];
