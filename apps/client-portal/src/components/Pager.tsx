import { useEffect, useState } from "react";
import {
	FaArrowLeft,
	FaArrowRight,
	FaCircleArrowLeft,
	FaCircleArrowRight,
	FaEllipsis,
} from "react-icons/fa6";

export interface PagerProps {
	currentPage: number;
	totalCount: number;
	onChangePage: (page: number) => void;
	pageSize: number;
	label?: string;
}

const DEFAULT_PAGE_COUNT = 5;

const Pager: React.FC<PagerProps> = ({
	totalCount,
	label,
	pageSize,
	currentPage,
	onChangePage,
}) => {
	const [pages, setPages] = useState([] as number[]);
	const numberOfPages = Math.ceil(totalCount / pageSize);
	useEffect(() => {
		const pages = Array.from({ length: numberOfPages }, (_, i) => i);
		setPages(pages);
	}, [totalCount, pageSize, numberOfPages]);

	useEffect(() => {
		if (currentPage + 1 > numberOfPages) {
			onChangePage(currentPage - 1);
		}
	}, [currentPage, onChangePage, numberOfPages]);

	let lowerBucket: number[] = [];
	let upperBucket: number[] = [];
	let middleBucket: number[] = [];
	const propIdxStart = currentPage * pageSize;
	const propIdxEnd = propIdxStart + pageSize;
	const lastPage = Math.ceil(totalCount / pageSize);

	if (lastPage <= DEFAULT_PAGE_COUNT) {
		lowerBucket = [];
		for (var i = 0; i < lastPage && i < DEFAULT_PAGE_COUNT; i++) {
			lowerBucket.push(i);
		}
		middleBucket = [];
		upperBucket = [];
	} else if (currentPage < 3 || currentPage >= lastPage - 3) {
		lowerBucket = [0, 1, 2];
		upperBucket = [lastPage - 3, lastPage - 2, lastPage - 1];
		middleBucket = [];
	} else {
		lowerBucket = [0];
		upperBucket = [lastPage - 1];
		middleBucket = [currentPage - 1, currentPage, currentPage + 1];
	}
	if (totalCount < pageSize) {
		return null;
	}
	return (
		<>
			<div className="flex flex-row justify-center items-center gap-2">
				<PagerItem
					textColor="text-dark-100"
					isSelected={false}
					onClick={() => onChangePage(0)}
					disabled={currentPage === 0}
					disabledColor="bg-light-200"
					disabledTextColor="text-light-400"
					icon={<FaCircleArrowLeft />}
				></PagerItem>
				<PagerItem
					textColor="text-white"
					color="bg-dark-100"
					isSelected={false}
					onClick={() =>
						currentPage > 0 && onChangePage(currentPage - 1)
					}
					disabled={currentPage === 0}
					icon={<FaArrowLeft />}
				></PagerItem>
				{lowerBucket.map((el, i) => {
					return (
						<PagerItem
							key={i}
							index={el}
							isSelected={el === currentPage}
							onClick={() => {
								onChangePage(el);
							}}
						></PagerItem>
					);
				})}
				{middleBucket.length > 0 && (
					<>
						<FaEllipsis />
						{middleBucket.map((el, i) => {
							return (
								<PagerItem
									key={i}
									index={el}
									isSelected={el === currentPage}
									onClick={() => {
										onChangePage(el);
									}}
								></PagerItem>
							);
						})}
					</>
				)}
				{upperBucket.length > 0 && (
					<>
						<FaEllipsis />
						{upperBucket.map((el, i) => {
							return (
								<PagerItem
									key={i}
									index={el}
									isSelected={el === currentPage}
									onClick={() => {
										onChangePage(el);
									}}
								></PagerItem>
							);
						})}
					</>
				)}
				<PagerItem
					textColor="text-white"
					color="bg-dark-100"
					isSelected={false}
					onClick={() =>
						currentPage < pages[pages.length - 1] &&
						onChangePage(currentPage + 1)
					}
					disabled={currentPage === lastPage}
					icon={<FaArrowRight />}
				></PagerItem>
				<PagerItem
					textColor="text-dark-100"
					isSelected={false}
					onClick={() => onChangePage(lastPage - 1)}
					disabled={currentPage === lastPage}
					disabledColor="bg-light-200"
					disabledTextColor="text-light-400"
					icon={<FaCircleArrowRight />}
				></PagerItem>
			</div>
			<div className={`w-full text-sm text-center py-2`}>
				{(propIdxStart + 1).toLocaleString()} -{" "}
				{(propIdxEnd > totalCount
					? totalCount
					: propIdxEnd
				).toLocaleString()}{" "}
				of {totalCount?.toLocaleString()} {label || "results"}
			</div>
		</>
	);
};

export const PagerItem = (props: PagerItemProps) => {
	const isDisabled = props.disabled || false;
	let buttonColor;
	let textColor;
	if (isDisabled) {
		buttonColor = props.disabledColor || "bg-dark-300";
		textColor = props.disabledTextColor || props.textColor;
	} else {
		buttonColor = `${
			props.isSelected ? "border-dark-100" : props.color || "bg-light-300"
		}`;
		textColor = `${props.textColor || ""}`;
	}
	return (
		<>
			<div
				onClick={() => {
					if (isDisabled) return;
					props.onClick();
				}}
				className={`${
					isDisabled ? "" : "hover:bg-light-200 hover:text-black"
				} ${textColor} cursor-pointer flex text-sm md:text-base  rounded-md border w-8 h-8 text-center justify-center items-center ${buttonColor}`}
			>
				{props.icon && props.icon}
				{props.index != null && props.index + 1}
			</div>
		</>
	);
};

interface PagerItemProps {
	index?: number;
	icon?: React.ReactNode;
	color?: string;
	textColor?: string;
	isSelected: boolean;
	disabled?: boolean;
	disabledTextColor?: string;
	disabledColor?: string;
	onClick: () => void;
}

export default Pager;
