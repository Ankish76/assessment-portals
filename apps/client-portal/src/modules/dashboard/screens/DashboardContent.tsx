"use client";
import { useStore } from "@root/lib/zustand/store";
import DashboardProject from "../components/DashboardProject";

const DashboardContent = () => {
	const projects = useStore(m => m.dashboardProjects);
	return (
		<>
			{projects?.map(project => (
				<DashboardProject project={project} key={project.ProjectId} />
			))}
		</>
	);
};
export default DashboardContent;
