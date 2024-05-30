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
import AssessmentList from "@root/modules/assessment/screens/AssessmentList";
import { getProjectAssessmentsQuery } from "@root/modules/assessment/queries";
import { ProjectAssessmentType } from "@root/modules/assessment/interfaces";
import RiskList from "@root/modules/riskAssessments/screens/Risk";
import {
	getProjectPriorityLevelsQuery,
	getProjectSeverityLevelsQuery,
	getRiskLevelsQuery,
	getRiskQuery,
} from "@root/modules/riskAssessments/queris";
import {
	PriorityLevelType,
	RiskAssessmentType,
	RiskLevelsType,
	SeverityLevelsType,
} from "@root/modules/riskAssessments/interfaces";

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
	const riskData =
		await serverAPICaller<RiskAssessmentType[]>(getRiskQuery());
	const riskLevels =
		await serverAPICaller<RiskLevelsType[]>(getRiskLevelsQuery());
	const severityLevels = await serverAPICaller<SeverityLevelsType[]>(
		getProjectSeverityLevelsQuery(),
	);
	const priorityLevels = await serverAPICaller<PriorityLevelType[]>(
		getProjectPriorityLevelsQuery(),
	);
	return (
		<PageWrapper
			dashboardProjects={dashboardProjects}
			dashboardProjectsRatings={dashboardProjectsRatings}
			categories={categories}
			users={users}
			projectStatus={projectStatus}
			projectAssessmentsData={projectAssessmentsData}
			riskData={riskData}
			riskLevels={riskLevels}
			severityLevels={severityLevels}
			priorityLevels={priorityLevels}
		>
			<AssessmentList />
			<RiskList />
		</PageWrapper>
	);
};
export default Home;
