// Tooltip.tsx
import React, { ReactNode } from "react";

interface TooltipProps {
	children: ReactNode;
	text: string;
	className?: string;
}

const Tooltip: React.FC<TooltipProps> = ({ children, text, className }) => {
	return (
		<div
			className={`relative inline-block ${
				className?.includes("width-") ? "" : "w-full"
			} group justify-center`}
		>
			<div
				className={`absolute z-50 hidden group-hover:block bg-gray-800 text-white text-xs py-2 px-4 rounded-md shadow-lg -top-10 left-1/2 transform -translate-x-1/2 ${
					className?.includes("w-") ? " " : "w-max"
				} ${className}`}
			>
				{text}
				<div className="absolute w-3 h-3 bg-gray-800 rotate-45 transform -translate-y-1/2 left-1/2 mt-2"></div>
			</div>
			<div className="w-full">{children}</div>
		</div>
	);
};

export default Tooltip;
