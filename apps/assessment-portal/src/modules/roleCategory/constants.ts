import { TableHeader } from "@root/types";
import { Category } from "../categories/interfaces";
import { Question, RoleCategory } from "./interfaces";

export const TableHeaders: TableHeader<RoleCategory>[] = [
	{
		className: "font-semibold basis-2/3",
		label: "Categry",
		selector: "Category",
	},
	{
		className: "basis-1/3 font-semibold",
		label: "",
	},
];
