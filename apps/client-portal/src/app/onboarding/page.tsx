import { serverAPICaller } from "@utils/handler/server";
import { getAllCategories } from "@root/modules/categories/queries";
import PageWrapper from "@components/layouts/PageWrapper";
import Card from "@root/components/Card";
import SingleSection from "@root/components/layouts/SingleSection";
import { Category } from "@root/modules/categories/interfaces";
import Onboarding from "@root/modules/onboarding/screens/Onboarding";
export default async function Home() {
	const categories = await serverAPICaller<Category[]>(getAllCategories());
	return (
		<SingleSection title="On Boarding" backgroundColor="bg-accent">
			<Card bgColor="bg-white p-1 pt-3 mt-4">
				<PageWrapper categories={categories}>
					<Onboarding />
				</PageWrapper>
			</Card>
		</SingleSection>
	);
}
