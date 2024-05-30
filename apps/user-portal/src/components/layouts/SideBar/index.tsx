"use client";
import { useSidebarContext } from "@components/layouts/SideBar/Context";
import { Sidebar } from "flowbite-react";
import { twMerge } from "tailwind-merge";
import { sideBarConfig } from "@constants/sideNav";
import { usePathname, useRouter } from "next/navigation";
import { FaFileZipper, FaHouse } from "react-icons/fa6";
import { useStore } from "@root/lib/zustand/store";
import { useEffect, useState } from "react";
import { RoleCategoryType } from "@root/modules/roleCategory/interfaces";
import { MdPendingActions } from "react-icons/md";
const { title, items } = sideBarConfig;

export const DashboardSidebar: React.FC = () => {
	const getAllUserProjects = useStore(m => m.getAllUserProjects);
	const clearRoleCategoryQuestions = useStore(
		m => m.clearRoleCategoryQuestions,
	);
	const projects = useStore(m => m.projects);
	const projectRoleCategories = useStore(m => m.projectRoleCategories);
	const [selectedProject, setSelectedProject] = useState<string>();
	const user = useStore(m => m.user);
	const router = useRouter();
	const path = usePathname();
	useEffect(() => {
		const userData = localStorage.getItem("userData");
		if (user?.UniqueId || (userData && JSON.parse(userData)?.UniqueId)) {
			let projectPath: any = "";
			if (path.split("/").length > 1)
				projectPath = projects.find(
					pro => pro.ProjectId === path.split("/")[1],
				)?.ProjectId;
			if (projectPath) {
				setSelectedProject(projectPath);
			}
			user?.UniqueId
				? getAllUserProjects(user?.UniqueId)
				: userData &&
					getAllUserProjects(JSON.parse(userData)?.UniqueId);
		} else {
			router.push("/login");
		}
	}, [user]);

	const { isCollapsed } = useSidebarContext();
	const getAllProjectRoleCategories = useStore(
		m => m.getAllProjectRoleCategories,
	);

	useEffect(() => {
		projects.map(project => {
			if (
				!projectRoleCategories.find(
					p => p.ProjectId == project.ProjectId,
				)
			)
				getAllProjectRoleCategories(project.ProjectId, project.RoleId);
		});
	}, [projects]);

	const handleNavigate = (url: string) => {
		clearRoleCategoryQuestions();
		router.push(url);
	};
	return (
		<>
			<Sidebar
				aria-label="Sidebar with multi-level dropdown example"
				collapsed={isCollapsed}
				id="sidebar"
				className={twMerge(
					"fixed inset-y-0 left-0 z-20 mt-16 flex h-full shrink-0 flex-col border-r border-gray-200 duration-75 dark:border-gray-700 lg:flex",
					isCollapsed ? "hidden w-16" : "",
				)}
			>
				<Sidebar.Items>
					<Sidebar.ItemGroup>
						<Sidebar.Item
							className=" font-bold text-mono hover:bg-black/10 text-2xl"
							icon={FaHouse}
							onClick={() => {}}
						>
							{title}
						</Sidebar.Item>
					</Sidebar.ItemGroup>

					<Sidebar.ItemGroup className="my-5 border-none">
						{items &&
							items.map((m: any) => (
								<Sidebar.Item
									className={
										m?.target == path
											? "bg-black/25 hover:bg-black/25"
											: "hover:bg-black/10"
									}
									key={m.label}
									icon={m.icon}
									onClick={() =>
										handleNavigate(`${m.target}`)
									}
								>
									<span className="py-5 text-base leading-none hover:cursor-pointer nav-link">
										{m.label}
									</span>
								</Sidebar.Item>
							))}
						{projects &&
							projects.map(m => (
								<Sidebar.Collapse
									className="hover:bg-black/10 text-white"
									icon={FaFileZipper}
									label={m.ProjectName}
									onClick={() =>
										setSelectedProject(prev =>
											prev === m.ProjectId
												? ""
												: m.ProjectId,
										)
									}
									key={m.UniqueId}
									open={selectedProject === m.ProjectId}
								>
									{projectRoleCategories?.length > 0
										? projectRoleCategories
												.find(
													p =>
														p.ProjectId ===
														m.ProjectId,
												)
												?.RoleCategories.map(
													(c: RoleCategoryType) => {
														return c.Category
															.length <= 18 ? (
															<Sidebar.Item
																className={twMerge(
																	"cursor-pointer",
																	`/${
																		m.ProjectId +
																		"/" +
																		c.CategoryId
																	}` == path
																		? "bg-black/25 hover:bg-black/25"
																		: "hover:bg-black/10",
																)}
																key={
																	c.CategoryId
																}
																onClick={() => {
																	`/${
																		m.ProjectId +
																		"/" +
																		c.CategoryId
																	}` !=
																		path &&
																		handleNavigate(
																			`${
																				process
																					.env
																					.NEXT_PUBLIC_HOST +
																				"/" +
																				m.ProjectId +
																				"/" +
																				c.CategoryId
																			}`,
																		);
																}}
															>
																<span className="py-5 text-base leading-none hover:cursor-pointer nav-link">
																	{c.Category}
																</span>
															</Sidebar.Item>
														) : null;
													},
												)
										: null}
								</Sidebar.Collapse>
							))}
						<Sidebar.Item
							className={
								"/action-items" == path
									? "bg-black/25 hover:bg-black/25"
									: "hover:bg-black/10"
							}
							key={"action-items"}
							icon={MdPendingActions}
							onClick={() => handleNavigate(`/action-items`)}
						>
							<span className="py-5 text-base leading-none hover:cursor-pointer nav-link">
								Action Items
							</span>
						</Sidebar.Item>
					</Sidebar.ItemGroup>
					<Sidebar.CTA className="hover:bg-black/10 hover:cursor-pointer ">
						<div
							onClick={() => router.push("/")}
							className=" py-1 px-0"
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
		</>
	);
};
