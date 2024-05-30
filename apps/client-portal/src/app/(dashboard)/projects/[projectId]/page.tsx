import PageWrapper from "@root/components/layouts/PageWrapper";
import { Category } from "@root/modules/categories/interfaces";
import { getAllCategories } from "@root/modules/categories/queries";
import {
	getDashboardDetails,
	getDashboardProjectRatings,
} from "@root/modules/dashboard/queries";
import { Page } from "@root/types";
import { serverAPICaller } from "@root/utils/handler/server";
import {
	DashboardProject,
	DashboardProjectType,
} from "@root/modules/dashboard/interfaces";
import ProjectDetail from "@root/modules/projectDetail/screens/ProjectDetail";
import { getAllUsers } from "@root/modules/users/queries";
import { User } from "@root/modules/users/interfaces";
import moment from "moment";

const Home: Page<{ projectId: string }> = async ({ params }) => {
	const { projectId } = params;
	const dashboardProjectsRatings = await serverAPICaller<DashboardProject[]>(
		getDashboardProjectRatings({
			projectId: projectId,
			DateRangeCondition: [
				moment().subtract(3, "months").format("MM/DD/YYYY"),
				moment().format("MM/DD/YYYY"),
			],
		}),
	);
	const categories = await serverAPICaller<Category[]>(getAllCategories());
	const users = await serverAPICaller<User[]>(getAllUsers());
	return (
		<PageWrapper
			dashboardProjectsRatings={dashboardProjectsRatings}
			categories={categories}
			users={users}
		>
			<ProjectDetail projectId={projectId} />
		</PageWrapper>
	);
};
export default Home;
