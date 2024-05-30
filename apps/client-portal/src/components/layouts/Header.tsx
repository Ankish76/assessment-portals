import { useSidebarContext } from "@components/layouts/SideBar/Context";
import { isSmallScreen } from "@helpers/isSmallScreen";
import clientConstants from "@root/constants/info";
import { useStore } from "@root/lib/zustand/store";
import { Avatar, DarkThemeToggle, Navbar } from "flowbite-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { HiMenuAlt1, HiX, HiUser, HiArrowDown } from "react-icons/hi";

const {
	ClientInfo: { Logo, Name },
} = clientConstants;

export const DashboardNavbar: React.FC<Record<string, never>> = function () {
	const {
		isCollapsed: isSidebarCollapsed,
		setCollapsed: setSidebarCollapsed,
	} = useSidebarContext();
	const { push } = useRouter();

	const [showLogout, setShowLogout] = useState<boolean>(false);
	const userLogout = useStore(m => m.userLogout);
	const router = useRouter();
	const handleLogout = () => {
		userLogout();
		localStorage.removeItem("adminUserData");
		router.push("/login");
	};

	return (
		<header>
			<Navbar
				fluid
				className="fixed top-0 z-30 w-full border-b border-gray-200 bg-white p-0 dark:border-gray-700 dark:bg-gray-800 sm:p-0"
			>
				<div className="w-full p-3 pr-4">
					<div className="flex items-center justify-between">
						<div className="flex items-center">
							{/* <button
								type="button"
								aria-controls="side-bar"
								aria-expanded
								className="mr-2 cursor-pointer rounded p-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:ring-2 focus:ring-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:bg-gray-700 dark:focus:ring-gray-700"
								onClick={() =>
									setSidebarCollapsed(!isSidebarCollapsed)
								}
							>
								{isSidebarCollapsed || !isSmallScreen() ? (
									<HiMenuAlt1 className="h-6 w-6" />
								) : (
									<HiX className="h-6 w-6" />
								)}
							</button> */}
							<Navbar.Brand
								onClick={() => push("/")}
								className="hover:cursor-pointer"
							>
								<p className="text-3xl font-mono font-bold">
									Aadya
									<span
										className="text-red-500 !text-4xl"
										style={{ color: "#d7b5cf" }}
									>
										Tek
									</span>
								</p>
							</Navbar.Brand>
						</div>
						<div className="flex items-center">
							<DarkThemeToggle /> &nbsp; &nbsp;
							<button
								onClick={() => setShowLogout(!showLogout)}
								type="button"
								className="text-blue-700 border border-gray-300 focus:ring-1 focus:outline-none  font-medium rounded-full text-sm p-1 text-center inline-flex items-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:focus:ring-blue-800 dark:hover:bg-blue-500"
							>
								<Avatar
									img="/assets/user.jpg"
									size="xs"
									alt="avatar"
									rounded
								/>{" "}
								&nbsp;
								<HiArrowDown />
							</button>
							{showLogout && (
								<div
									className={`border bg-dark-100 shadow-xl ${
										showLogout ? "flex" : "hidden"
									} gap-1 items-center px-7 py-2 rounded absolute top-16 right-7 z-20`}
								>
									<button
										onClick={handleLogout}
										className="text-base leading-none text-white  rounded h-8"
									>
										Log Out
									</button>
								</div>
							)}
							{/* <button
								type="button"
								className="text-blue-700 border border-blue-700 hover:bg-blue-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:focus:ring-blue-800 dark:hover:bg-blue-500"
							>
								<HiUser /> &nbsp; &nbsp;
								<HiArrowDown />
							</button> */}
						</div>
					</div>
				</div>
			</Navbar>
		</header>
	);
};
