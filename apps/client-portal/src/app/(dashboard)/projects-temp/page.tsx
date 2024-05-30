import { serverAPICaller } from "@utils/handler/server";
import PageWrapper from "@components/layouts/PageWrapper";
import { Project } from "@root/modules/projects/interfaces";
import ProjectList from "@root/modules/projects/screens/List";
import { getAllProjects } from "@root/modules/projects/queries";

// Opt out of caching for all data requests in the route segment
export const dynamic = "force-dynamic";

const Home = async () => {
	const projects = await serverAPICaller<Project[]>(getAllProjects());
	return (
		<PageWrapper projects={projects}>
			<ProjectList />
		</PageWrapper>
	);
};

export default Home;
