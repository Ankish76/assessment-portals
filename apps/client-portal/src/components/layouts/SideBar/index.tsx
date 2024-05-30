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
import { DashboardProjectType } from "@root/modules/dashboard/interfaces";
const { title, items } = sideBarConfig;

export const DashboardSidebar: React.FC = () => {
	const [selectedDropdown, setSelectedDropdown] = useState<string>("");
	const getAllCategories = useStore(m => m.getAllCategories);
	const getAllRoles = useStore(m => m.getAllRolesData);
	const getDashboardDetails = useStore(m => m.getDashboardDetails);
	const categories = useStore(m => m.categories);
	const roles = useStore(m => m.roles);
	const dashboardProjects = useStore(m => m.dashboardProjects);
	const { isCollapsed } = useSidebarContext();
	const path = usePathname();
	const { push } = useRouter();
	const router = useRouter();

	useEffect(() => {
		getAllCategories();
		getAllRoles();
		getDashboardDetails();
		if (path.includes("/category-question")) {
			setSelectedDropdown("category-question");
		} else if (path.includes("/role-categories")) {
			setSelectedDropdown("role-categories");
		} else if (path.includes("/projects/")) {
			setSelectedDropdown("projects");
		}
	}, []);

	useEffect(() => {
		const userData = localStorage.getItem("adminUserData");
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
				"fixed inset-y-0 left-0 z-20 mt-16 flex h-full shrink-0 flex-col border-r border-gray-200 duration-75 dark:border-gray-700 lg:flex",
				isCollapsed ? "hidden w-16" : "",
			)}
		>
			<Sidebar.Items>
				<Sidebar.ItemGroup>
					<Sidebar.Item
						className={twMerge(
							"font-bold text-mono",
							"/" == path
								? "text-xl hover:bg-black/25"
								: "hover:bg-black/10 text-2xl",
						)}
						onClick={() => push("/")}
						icon={FaHouse}
					>
						{title}
					</Sidebar.Item>
				</Sidebar.ItemGroup>
				<Sidebar.ItemGroup className="my-5 border-none">
					{items.map(m => (
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
						icon={FaDiagramProject}
						label={"Projects Details"}
						onClick={() =>
							setSelectedDropdown(prev =>
								prev === "projects" ? "" : "projects",
							)
						}
						key={"Projects"}
						open={selectedDropdown === "projects"}
					>
						{dashboardProjects?.length > 0
							? dashboardProjects.map(
									(c: DashboardProjectType) => {
										return c.ProjectName.length <= 20 ? (
											<Sidebar.Item
												className={twMerge(
													"cursor-pointer",
													`/projects/${c.ProjectId}` ==
														path
														? "bg-black/25 hover:bg-black/25"
														: "hover:bg-black/10",
												)}
												key={c.ProjectId}
												onClick={() =>
													handleNavigate(
														`${
															process.env
																.NEXT_PUBLIC_HOST +
															"/projects/" +
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

					<Sidebar.Collapse
						className="hover:bg-black/10 text-white"
						icon={FaCircleQuestion}
						label={"Category Questions"}
						onClick={() =>
							setSelectedDropdown(prev =>
								prev === "category-question"
									? ""
									: "category-question",
							)
						}
						key={"category-question"}
						open={selectedDropdown === "category-question"}
					>
						{categories?.length > 0
							? categories.map((c: Category) => {
									return c.Category.length <= 18 ? (
										<Sidebar.Item
											className={twMerge(
												"cursor-pointer",
												`/category-question/${c.UniqueId}` ==
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
														"/category-question/" +
														c.UniqueId
													}`,
												)
											}
										>
											<span className="py-5 text-base leading-none hover:cursor-pointer nav-link">
												{c.Category}
											</span>
										</Sidebar.Item>
									) : null;
								})
							: null}
					</Sidebar.Collapse>
					<Sidebar.Collapse
						className="hover:bg-black/10 text-white"
						icon={FaCircleQuestion}
						label={"Category Roles"}
						onClick={() =>
							setSelectedDropdown(prev =>
								prev === "role-categories"
									? ""
									: "role-categories",
							)
						}
						key={"role-categories"}
						open={selectedDropdown === "role-categories"}
					>
						{roles?.length > 0
							? roles.slice(0, 5).map((c: Role) => {
									return c.Role.length <= 18 ? (
										<Sidebar.Item
											className={twMerge(
												"cursor-pointer",
												`/role-categories/${c.UniqueId}` ==
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
														"/role-categories/" +
														"/" +
														c.UniqueId
													}`,
												)
											}
										>
											<span className="py-5 text-base leading-none hover:cursor-pointer nav-link">
												{c.Role}
											</span>
										</Sidebar.Item>
									) : null;
								})
							: null}
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
