import { type CustomFlowbiteTheme } from "flowbite-react";

export const flowbiteTheme: CustomFlowbiteTheme = {
	footer: {
		root: {
			base: "flex flex-col",
		},
		brand: {
			base: "m-6 flex items-center",
		},
		groupLink: {
			base: "flex flex-col flex-wrap text-gray-500 dark:text-white",
			link: {
				base: "mb-4 last:mr-0 md:mr-6",
			},
		},
		icon: {
			base: "text-gray-400 hover:text-gray-900 dark:hover:text-white",
		},
	},
	modal: {
		body: {
			base: "space-y-6 px-6 pb-4 sm:pb-6 lg:px-8 xl:pb-8",
		},
	},
	sidebar: {
		root: {
			base: "h-full bg-sidenav text-white",
			inner: "h-full overflow-y-auto overflow-x-hidden bg-sidenav text-white py-4 px-3",
		},
		collapse: {
			icon: { base: "text-white", open: { on: "text-white" } },
			list: "space-y-2 py-2 list-none",
		},
		item: {
			icon: { base: "text-white" },
			base: "no-underline flex items-center rounded-lg p-2 text-lg font-normal text-gray-900 hover:bg-gray-100 text-white dark:hover:bg-gray-700",
		},
		itemGroup: {
			base: "list-none border-t border-gray-200 pt-3 first:mt-0 first:border-t-0 first:pt-0 dark:border-gray-700",
		},
		cta: {
			base: "no-underline flex items-center rounded-lg p-2 text-lg font-normal text-gray-900 hover:bg-gray-100 text-white dark:hover:bg-gray-700",
		},
	},
};
