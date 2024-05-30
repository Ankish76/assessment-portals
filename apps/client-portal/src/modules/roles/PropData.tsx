import { TableHeader } from "@root/types";
import { Role } from "./interfaces";

export const TableHeaders: TableHeader<Role>[] = [
	{
		className: "basis-2/5 font-semibold",
		label: "Role",
		selector: "Role",
	},
	{
		className: "basis-2/5 font-semibold",
		label: "Description",
		selector: "Desc",
	},
	{
		className: "basis-1/5 font-semibold",
		label: "",
	},
];
