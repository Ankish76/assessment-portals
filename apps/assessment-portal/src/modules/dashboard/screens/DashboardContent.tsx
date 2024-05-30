"use client";
import { useStore } from "@root/lib/zustand/store";
import { useEffect } from "react";
import DashboardProject from "../components/DashboardProject";

const DashboardContent = () => {
	const user = useStore(m => m.user);
	const getDashboardDetails = useStore(m => m.getDashboardDetails);
	const dashboardProjects = useStore(m => m.dashboardProjects);
	useEffect(() => {
		getDashboardDetails();
	}, []);

	return (
		<>
			{dashboardProjects.length >= 0
				? dashboardProjects.map(project => (
						<DashboardProject
							project={project}
							key={project.UniqueId}
						/>
					))
				: null}
		</>
	);
};
export default DashboardContent;
