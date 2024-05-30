import { ReactNode } from "react";
const OneSectionWithSideNavAndHeaderLayout: React.FunctionComponent<{
	sideNav: ReactNode;
	sideNavProps?: any;
	headerSection?: ReactNode;
	children?: any;
	backgroundColor?: any;
}> = ({
	sideNav,
	children = <div></div>,
	headerSection = <div></div>,
	backgroundColor,
}) => {
	return (
		<div className="flex h-full max-h-screen">
			<div className={`min-w-[240px] w-[240px]`}>{sideNav}</div>
			<div className={`flex-grow flex flex-col`}>
				<div>{headerSection}</div>
				<div
					className={`${backgroundColor} w-full h-screen flex-grow overflow-y-scroll`}
				>
					{children}
				</div>
			</div>
		</div>
	);
};

export default OneSectionWithSideNavAndHeaderLayout;
