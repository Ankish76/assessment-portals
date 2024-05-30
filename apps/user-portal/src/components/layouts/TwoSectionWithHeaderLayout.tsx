import Image from "next/image";
import { ReactNode } from "react";

const TwoSectionWithHeaderLayout: React.FunctionComponent<{
	backgroundColor: string;
	header: ReactNode;
	leftSection: ReactNode;
	rightSection: ReactNode;
}> = ({ backgroundColor, header, leftSection, rightSection }) => {
	return (
		<div className={`${backgroundColor} w-full h-full p-4`}>
			<div className="flex flex-col flex-wrap gap-4">
				{/** Header Section */}
				{header}
				<div className="grid lg:grid-cols-2 md:grid-cols-1 gap-4">
					<div>
						{/** Left Section */}
						{leftSection}
					</div>
					<div>
						{/** Right Section */}
						{rightSection}
					</div>
				</div>
			</div>
		</div>
	);
};

export default TwoSectionWithHeaderLayout;
