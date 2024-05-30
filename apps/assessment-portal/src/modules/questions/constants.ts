import { TableHeader } from "@root/types";
import { Category } from "../categories/interfaces";
import { Question } from "./interfaces";

export const TableHeaders: TableHeader<Question>[] = [
	{
		className: "font-semibold basis-2/3",
		label: "Question",
		selector: "Question",
	},
	{
		className: "basis-1/3 font-semibold",
		label: "",
	},
];
