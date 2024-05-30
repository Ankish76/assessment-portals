import PageWrapper from "@root/components/layouts/PageWrapper";
import { Category } from "@root/modules/categories/interfaces";
import { getAllCategories } from "@root/modules/categories/queries";
import GroupedQuestions from "@root/modules/questions/screens/GroupedQuestions";
import { Question } from "@root/modules/questions/interfaces";
import { getAllCategoryQuestions } from "@root/modules/questions/queries";
import { Page } from "@root/types";
import { serverAPICaller } from "@root/utils/handler/server";

const Home: Page<{ category: string }> = async ({ params }) => {
	const { category } = params;
	const categories = await serverAPICaller<Category[]>(getAllCategories());
	const categoryQuestions = await serverAPICaller<Question[]>(
		getAllCategoryQuestions([
			{
				Param: "CategoryId",
				Value: category,
			},
		]),
	);

	return (
		<PageWrapper questions={categoryQuestions} categories={categories}>
			<GroupedQuestions category={category} />
		</PageWrapper>
	);
};
export default Home;
