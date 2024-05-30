import { serverAPICaller } from "@utils/handler/server";
import PageWrapper from "@components/layouts/PageWrapper";
import { Project } from "@root/modules/projects/interfaces";
import ProjectList from "@root/modules/projects/screens/List";
import { getAllProjects } from "@root/modules/projects/queries";
import DashboardContent from "@root/modules/dashboard/screens/DashboardContent";
import { getDashboardDetails } from "@root/modules/dashboard/queries";
import { DashboardProjectType } from "@root/modules/dashboard/interfaces";
import { User } from "@root/modules/auth/store";
import { Category } from "@root/modules/categories/interfaces";
import { getAllCategories } from "@root/modules/categories/queries";
import { getAllUsers } from "@root/modules/users/queries";

// Opt out of caching for all data requests in the route segment
export const dynamic = "force-dynamic";

const Home = async () => {
	const projects = await serverAPICaller<DashboardProjectType[]>(
		getDashboardDetails(),
	);
	const categories = await serverAPICaller<Category[]>(getAllCategories());
	const users = await serverAPICaller<User[]>(getAllUsers());
	return (
		<PageWrapper
			dashboardProjects={projects}
			categories={categories}
			users={users}
		>
			<DashboardContent />
		</PageWrapper>
	);
};

export default Home;
