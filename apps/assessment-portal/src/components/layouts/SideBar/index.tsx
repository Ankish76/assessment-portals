import { useSidebarContext } from "@components/layouts/SideBar/Context";
import { Sidebar } from "flowbite-react";
import { twMerge } from "tailwind-merge";
import { sideBarConfig } from "@constants/sideNav";
import { usePathname, useRouter } from "next/navigation";
import { FaCircleQuestion, FaDiagramProject, FaHouse } from "react-icons/fa6";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useStore } from "@root/lib/zustand/store";
import { Category } from "@root/modules/categories/interfaces";
import { Role } from "@root/modules/roles/interfaces";
import { DashboardProject } from "@root/modules/dashboard/interfaces";
import { VscFeedback } from "react-icons/vsc";
import { FaComments } from "react-icons/fa6";
import { IoIosWarning } from "react-icons/io";
const { title, items } = sideBarConfig;

export const DashboardSidebar: React.FC = () => {
	const [selectedDropdown, setSelectedDropdown] = useState<string>("");
	const [selectedSubDropdown, setSelectedSubDropdown] = useState("");
	const getAllCategories = useStore(m => m.getAllCategories);
	const getAllRoles = useStore(m => m.getAllRolesData);
	const getDashboardDetails = useStore(m => m.getDashboardDetails);
	const dashboardProjects = useStore(m => m.dashboardProjects);
	const { isCollapsed } = useSidebarContext();
	const path = usePathname();
	const { push } = useRouter();
	const router = useRouter();

	useEffect(() => {
		getAllCategories();
		getAllRoles();
		getDashboardDetails();
		if (path.includes("/clients")) {
			setSelectedDropdown("feedbacks");
			setSelectedSubDropdown("projects-client");
		}
		if (path.includes("/risk-assessments")) {
			setSelectedDropdown("risk-assessments");
			setSelectedSubDropdown("projects-client");
		}
	}, []);

	useEffect(() => {
		const userData = localStorage.getItem("AssessmentUserData");
		if (!userData) {
			router.push("/login");
		}
	}, []);

	const handleNavigate = (url: string) => {
		push(url);
	};
	return (
		<Sidebar
			aria-label="Sidebar with multi-level dropdown example"
			collapsed={isCollapsed}
			id="sidebar"
			className={twMerge(
				"fixed inset-y-0 left-0 z-20 mt-20 flex h-full shrink-0 flex-col border-r border-gray-200 duration-75 dark:border-gray-700 lg:flex",
				isCollapsed ? "hidden w-16" : "",
			)}
		>
			<Sidebar.Items>
				<Sidebar.ItemGroup>
					<Sidebar.Item
						className={twMerge(
							"font-semibold text-mono",
							"/" == path
								? "text-xl hover:bg-black/25"
								: "hover:bg-black/10 text-2xl",
						)}
						onClick={() => {}}
						icon={FaHouse}
					>
						<span className="font-semibold text-lg">{title}</span>
					</Sidebar.Item>
				</Sidebar.ItemGroup>
				<Sidebar.ItemGroup className="my-5 border-none">
					{items &&
						items.map(m => (
							<Sidebar.Item
								className={twMerge(
									m.target == path
										? "active bg-black/25 text-white hover:bg-black/25"
										: "hover:bg-black/10 text-gray-300",
								)}
								key={m.label}
								onClick={() => push(`${m.target || m.link}`)}
								target={m.link ? "_blank" : ""}
								icon={m.icon}
							>
								<span className="py-5 text-base leading-none hover:cursor-pointer nav-link">
									{m.label}
								</span>
							</Sidebar.Item>
						))}
					<Sidebar.Collapse
						className="hover:bg-black/10 text-white"
						icon={FaComments}
						label={"Feedbacks"}
						onClick={() =>
							setSelectedDropdown(prev =>
								prev === "feedbacks" ? "" : "feedbacks",
							)
						}
						key={"Feedbacks"}
						open={
							selectedDropdown === "feedbacks" ||
							selectedDropdown === "projects-client"
						}
					>
						<Sidebar.Collapse
							className="hover:bg-black/10 text-white pl-6"
							label={"Finilio"}
							onClick={() =>
								setSelectedSubDropdown(prev =>
									prev === "projects-client"
										? ""
										: "projects-client",
								)
							}
							key={"Projects-client"}
							open={selectedSubDropdown === "projects-client"}
						>
							{dashboardProjects?.length > 0
								? dashboardProjects.map(
										(c: DashboardProject) => {
											return c.ProjectName.length <=
												20 ? (
												<Sidebar.Item
													className={twMerge(
														"cursor-pointer",
														`/clients/${c.ProjectId}` ==
															path
															? "bg-black/25 hover:bg-black/25"
															: "hover:bg-black/10",
													)}
													key={c.UniqueId}
													onClick={() =>
														handleNavigate(
															`${
																process.env
																	.NEXT_PUBLIC_HOST +
																"/clients/" +
																c.ProjectId
															}`,
														)
													}
												>
													<span className="py-5 text-base leading-none hover:cursor-pointer nav-link">
														{c.ProjectName}
													</span>
												</Sidebar.Item>
											) : null;
										},
									)
								: null}
						</Sidebar.Collapse>
					</Sidebar.Collapse>
					<Sidebar.Collapse
						className="hover:bg-black/10 text-white"
						icon={IoIosWarning}
						label={"Risk Assessments"}
						onClick={() =>
							setSelectedDropdown(prev =>
								prev === "risk-assessments"
									? ""
									: "risk-assessments",
							)
						}
						key={"Risk Assessments"}
						open={
							selectedDropdown === "risk-assessments" ||
							selectedDropdown === "projects-client"
						}
					>
						<Sidebar.Collapse
							className="hover:bg-black/10 text-white pl-6"
							label={"Finilio"}
							onClick={() =>
								setSelectedSubDropdown(prev =>
									prev === "projects-client"
										? ""
										: "projects-client",
								)
							}
							key={"Projects-client"}
							open={selectedSubDropdown === "projects-client"}
						>
							{dashboardProjects?.length > 0
								? dashboardProjects.map(
										(c: DashboardProject) => {
											return c.ProjectName.length <=
												20 ? (
												<Sidebar.Item
													className={twMerge(
														"cursor-pointer",
														`/risk-assessments/${c.ProjectId}` ==
															path
															? "bg-black/25 hover:bg-black/25"
															: "hover:bg-black/10",
													)}
													key={c.UniqueId}
													onClick={() =>
														handleNavigate(
															`${
																process.env
																	.NEXT_PUBLIC_HOST +
																"/risk-assessments/" +
																c.ProjectId
															}`,
														)
													}
												>
													<span className="py-5 text-base leading-none hover:cursor-pointer nav-link">
														{c.ProjectName}
													</span>
												</Sidebar.Item>
											) : null;
										},
									)
								: null}
						</Sidebar.Collapse>
					</Sidebar.Collapse>
				</Sidebar.ItemGroup>
				<Sidebar.CTA className="hover:bg-black/10">
					<div
						onClick={() => push("/")}
						className="hover:cursor-pointer shadow-[0_30px_30px_-15px_rgba(74,4,78,0.9)] py-1 px-0"
					>
						<div className="text-xs flex flex-col font-mono">
							powered by{" "}
							<p className="text-3xl font-mono font-bold">
								Aadya
								<span
									className="text-red-500 !text-4xl"
									style={{ color: "#d7b5cf" }}
								>
									Tek
								</span>
							</p>
						</div>
					</div>
				</Sidebar.CTA>
			</Sidebar.Items>
		</Sidebar>
	);
};
