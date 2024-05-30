import { TableHeader } from "@root/types";
import { User } from "./interfaces";

export const TableHeaders: TableHeader<User>[] = [
	{
		className: "basis-1/4 font-semibold",
		label: "USER",
		selector: "Fullname",
	},
	{
		className: "basis-1/4 font-semibold",
		label: "EMAIL",
		selector: "Email",
	},
	{
		className: "!justify-center basis-1/4 font-semibold",
		label: "PHONE",
		selector: "Phone",
		sort: false,
	},
	{
		className: "!justify-end basis-1/4",
		label: "",
		sort: false,
	},
];
