import PageWrapper from "@root/components/layouts/PageWrapper";
// import { Category } from "@root/modules/categories/interfaces";
// import { getAllCategories } from "@root/modules/categories/queries";
// import { getDashboardProjectRatings } from "@root/modules/dashboard/queries";
import { Page } from "@root/types";
import { serverAPICaller } from "@root/utils/handler/server";
import { DashboardProjectType } from "@root/modules/dashboard/interfaces";
import {
	PriorityLevelType,
	RiskAssessmentType,
	RiskLevelsType,
	SeverityLevelsType,
} from "@root/modules/riskAssessments/interfaces";
import {
	getProjectPriorityLevelsQuery,
	getProjectSeverityLevelsQuery,
	getRiskLevelsQuery,
	getRiskQuery,
} from "@root/modules/riskAssessments/queris";
import RiskList from "@root/modules/riskAssessments/screens/Risk";
import React from "react";

const Home: React.FC = async () => {
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
	console.log(riskData);
	return (
		<PageWrapper
			riskData={riskData}
			riskLevels={riskLevels}
			severityLevels={severityLevels}
			priorityLevels={priorityLevels}
		>
			<RiskList />
		</PageWrapper>
	);
};
export default Home;
