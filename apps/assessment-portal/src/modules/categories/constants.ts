import { TableHeader } from "@root/types";
import { Category } from "./interfaces";

export const TableHeaders: TableHeader<Category>[] = [
	{
		className: "basis-2/5 font-semibold",
		label: "CATEGORY",
		selector: "Category",
	},
	{
		className: "basis-2/5 font-semibold",
		label: "DESCRIPTION",
		selector: "Desc",
	},
	{
		className: "basis-1/5 font-semibold",
		label: "",
	},
];
