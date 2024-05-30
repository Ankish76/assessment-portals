import React, { useState } from "react";
import ButtonWithIcon from "../ButtonWithIcon";
import { FaMagnifyingGlass, FaPenToSquare } from "react-icons/fa6";

type TabbedModalViewProps = {
	editChild: React.ReactNode;
	previewChild: React.ReactNode;
	viewtType: "edit" | "preview";
	handleShare?: Function;
	bottomChild: React.ReactNode;
};
const TabbedModalView: React.FC<TabbedModalViewProps> = ({
	editChild,
	previewChild,
	viewtType = "edit",
	handleShare,
	bottomChild,
}) => {
	const [activeTab, setActiveTab] = useState<"edit" | "preview">(viewtType);

	const handleTabClick = (tab: "edit" | "preview") => {
		setActiveTab(tab);
	};

	return (
		<div className="flex flex-col h-full">
			<div className="flex gap-1 w-full justify-center bg-white py-3 sticky top-0 items-center max-h-[68px] shadow-xl z-10">
				<ButtonWithIcon
					classNames={`tab cursor-pointer rounded-full h-12 px-6 hover:bg-blue-400 text-xl font-semibold   ${
						activeTab === "edit" ? "bg-border" : "bg-white"
					} ${
						activeTab === "edit" ? "text-header" : "text-dark-100"
					}`}
					onClick={() => handleTabClick("edit")}
					icon={<FaPenToSquare />}
					text="Edit"
				/>
				<ButtonWithIcon
					classNames={`tab cursor-pointer rounded-full h-12 px-6 text-xl hover:bg-blue-400 font-semibold   ${
						activeTab === "preview" ? "bg-border" : "bg-white"
					} ${
						activeTab === "preview"
							? "text-header"
							: "text-dark-100"
					}`}
					onClick={() => handleTabClick("preview")}
					icon={<FaMagnifyingGlass />}
					text="Preview"
				/>
			</div>
			<div
				className={`h-screen overflow-y-scroll tabbed-modal-content ${
					activeTab === "edit" ? "bg-accent-200" : "bg-dark-100"
				} `}
			>
				{activeTab === "edit" && (
					<div className="py-4 px-2">{editChild}</div>
				)}
				{activeTab === "preview" && (
					<div className="py-4 px-6">{previewChild}</div>
				)}
			</div>

			<div className="flex justify-center sticky bottom-0 max-h-20 bg-white space-x-2 p-4">
				{bottomChild}
			</div>
		</div>
	);
};

export default TabbedModalView;
