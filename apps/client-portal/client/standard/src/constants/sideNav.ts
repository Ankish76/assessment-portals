import { SideNavConfig } from "@root/types";
import {
	FaList,
	FaUsers,
	FaUsersViewfinder,
	FaDiagramProject,
} from "react-icons/fa6";
import { MdDashboard } from "react-icons/md";
export const sideBarConfig: SideNavConfig = {
	title: "Admin Portal",
	items: [
		{
			icon: MdDashboard,
			label: "Dashboard",
			target: "/",
		},
		{
			icon: FaDiagramProject,
			label: "Projects Summary",
			target: "/projects-temp",
		},
		{
			icon: FaList,
			label: "Categories",
			target: "/categories",
		},
		{
			icon: FaUsers,
			label: "Users",
			target: "/users",
		},
		{
			icon: FaUsersViewfinder,
			label: "Roles",
			target: "/roles",
		},
		// {
		// 	icon: FaCircleQuestion,
		// 	label: "Category Questions",
		// 	target: "/category-questions",
		// },
		// {
		// 	icon: FaCircleQuestion,
		// 	label: "Mappings",
		// 	target: "/role-categories",
		// },
	],
};
