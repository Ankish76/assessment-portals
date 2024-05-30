import React from "react";
import { FaSortDown, FaSortUp } from "react-icons/fa6";

type Props = {
	label: string;
	selector: string;
	highlighter: any;
	handleSort?: any;
	className: string;
	sort?: boolean;
	containerClassName?: string;
	excludedTerms?: string[];
	index?: number;
};
const TableHeader = ({
	label,
	selector,
	highlighter,
	handleSort,
	className,
	containerClassName,
	sort = true,
	excludedTerms,
	index,
}: Props) => {
	const handleSelector = () => {
		let order = "asc";
		if (highlighter.selector == selector) {
			order = highlighter.order == "asc" ? "desc" : "asc";
		}
		handleSort(selector, order);
	};
	const getListId = (
		index: number,
		entityName: string,
		key?: string,
	): string => {
		if (!key) return `${index}_${entityName}`.toLowerCase();
		const _key = key?.includes(" ") ? key?.replace(/ /g, "_") : key;
		return `${index}_${entityName}_${_key}`.toLowerCase();
	};

	const isExcluded = (selector: string): boolean => {
		if (selector === "" || selector === null || selector === undefined)
			return true;
		if (
			(excludedTerms && excludedTerms?.length <= 0) ||
			excludedTerms === undefined
		)
			return false;
		return excludedTerms.includes(selector);
	};

	const getId = () =>
		index ? getListId(index, "TableHeader", label) : `TableHeader_${label}`;

	return (
		<div
			id={getId()}
			className={`relative sm:p-2.5 md:h-[33px] lg:h-[41px] md:py-2 md:pl-[10px] md:pr-6 lg:py-3 lg:pr-7 flex justify-between hover:bg-light-400 items-center
      ${label && !isExcluded(label) ? "hover:bg-blue-200 hover:text-dark-200" : "pointer-events-none"}
      ${className} ${
			highlighter.selector == selector
				? "bg-light-400 text-label"
				: `bg-accent`
		}`}
			onClick={() => handleSelector()}
		>
			{label}
			<div className="flex items-center">
				{!isExcluded(label) && handleSort && (
					<div className={`flex flex-col absolute pl-2 `}>
						<FaSortUp
						// size="md"
						// color={
						// 	highlighter.selector == selector &&
						// 	highlighter.order == "asc"
						// 		? "text-dark-200"
						// 		: "text-dark-300"
						// }
						/>
						<FaSortDown
						// size="sm"
						// color={
						// 	highlighter.selector == selector &&
						// 	highlighter.order == "desc"
						// 		? "text-dark-200"
						// 		: "text-dark-300"
						// }
						/>
					</div>
				)}
			</div>
		</div>
	);
};

export default TableHeader;
