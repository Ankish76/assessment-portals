import PageWrapper from "@root/components/layouts/PageWrapper";
import { Category } from "@root/modules/categories/interfaces";
import { getAllCategories } from "@root/modules/categories/queries";
import { getDashboardProjectRatings } from "@root/modules/dashboard/queries";
import { Page } from "@root/types";
import { serverAPICaller } from "@root/utils/handler/server";
import { DashboardProject } from "@root/modules/dashboard/interfaces";
import ProjectDetail from "@root/modules/projectDetail/screens/ProjectDetail";
import { getAllUsers } from "@root/modules/users/queries";
import { User } from "@root/modules/users/interfaces";
import moment from "moment";
import { getDashboardDetails } from "@root/modules/projectDetail/queries";
import { ProjectStatusType } from "@root/modules/sharedStore/interfaces";
import { getProjectStatusQuery } from "@root/modules/sharedStore/query";
import { getProjectAssessmentsQuery } from "@root/modules/assessment/queries";
import { ProjectAssessmentType } from "@root/modules/assessment/interfaces";

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
	const dashboardProjects = await serverAPICaller<DashboardProject[]>(
		getDashboardDetails(),
	);
	const categories = await serverAPICaller<Category[]>(getAllCategories());
	const users = await serverAPICaller<User[]>(getAllUsers());
	const projectStatus = await serverAPICaller<ProjectStatusType[]>(
		getProjectStatusQuery(),
	);
	const projectAssessmentsData = await serverAPICaller<
		ProjectAssessmentType[]
	>(getProjectAssessmentsQuery());

	return (
		<PageWrapper
			dashboardProjects={dashboardProjects}
			dashboardProjectsRatings={dashboardProjectsRatings}
			categories={categories}
			users={users}
			projectStatus={projectStatus}
			projectAssessmentsData={projectAssessmentsData}
		>
			<ProjectDetail projectId={projectId} />
		</PageWrapper>
	);
};
export default Home;
