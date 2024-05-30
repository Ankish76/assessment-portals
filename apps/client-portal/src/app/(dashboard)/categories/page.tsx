import { serverAPICaller } from "@utils/handler/server";
import { getAllCategories } from "@root/modules/categories/queries";
import PageWrapper from "@components/layouts/PageWrapper";
import { Category } from "@root/modules/categories/interfaces";
import CategoryList from "@root/modules/categories/screens/List";

// Opt out of caching for all data requests in the route segment
export const dynamic = "force-dynamic";

const Home = async () => {
	const categories = await serverAPICaller<Category[]>(getAllCategories());
	return (
		<PageWrapper categories={categories}>
			<CategoryList />
		</PageWrapper>
	);
};

export default Home;
