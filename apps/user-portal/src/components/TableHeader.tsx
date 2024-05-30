import React from "react";

type Props = {
	label: string;
	selector: string;
	highlighter: any;
	handleSort?: any;
	className: string;
	sort?: boolean;
};
const TableHeader = ({
	label,
	selector,
	highlighter,
	handleSort,
	className,
	sort = true,
}: Props) => {
	const handleSelector = () => {
		let order = "asc";
		if (highlighter.selector == selector) {
			order = highlighter.order == "asc" ? "desc" : "asc";
		}
		handleSort(selector, order);
	};
	return (
		<div
			className={`p-3 flex justify-between hover:bg-membio-blue-200 items-center w-96 bg-accent hover:bg-gray-300 hover:text-dark-200
      ${className}`}
			onClick={() => handleSelector()}
		>
			{label}
		</div>
	);
};

export default TableHeader;
