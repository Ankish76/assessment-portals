"use client";
import {
	SidebarProvider,
	useSidebarContext,
} from "@components/layouts/SideBar/Context";
import { twMerge } from "tailwind-merge";
import { DashboardNavbar } from "@components/layouts/Header";
import { DashboardSidebar } from "@components/layouts/SideBar";

const DashboardLayoutContent: React.FC<React.PropsWithChildren> = function ({
	children,
}) {
	const { isCollapsed } = useSidebarContext();
	return (
		<>
			<DashboardNavbar />
			<main className="mt-16 flex items-start">
				<DashboardSidebar />
				<div
					id="main-content"
					className={twMerge(
						"relative h-full w-full overflow-y-auto bg-gray-50 dark:bg-gray-900",
						isCollapsed ? "lg:ml-[4.5rem]" : "lg:ml-64",
					)}
				>
					{children}
				</div>
			</main>
		</>
	);
};

const Dashboard: React.FC<React.PropsWithChildren> = function ({ children }) {
	return (
		<SidebarProvider>
			<DashboardLayoutContent>{children}</DashboardLayoutContent>
		</SidebarProvider>
	);
};

export default Dashboard;
