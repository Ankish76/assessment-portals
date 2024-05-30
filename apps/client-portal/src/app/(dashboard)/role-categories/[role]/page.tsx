import PageWrapper from "@components/layouts/PageWrapper";
import { getRoleCategories } from "@root/modules/categories/queries";
import { RoleCategory } from "@root/modules/roleCategory/interfaces";
import QuestionsRoleList from "@root/modules/roleCategory/screens/QuestionsRoleList";
import { Role } from "@root/modules/roles/interfaces";
import { getAllRoles } from "@root/modules/roles/queries";
import { Page } from "@root/types";
import { serverAPICaller } from "@root/utils/handler/server";
const CategoryRoleQuestions: Page<{ role: string }> = async ({ params }) => {
	const { role } = params;
	const roles = await serverAPICaller<Role[]>(getAllRoles());
	const roleCategories = await serverAPICaller<RoleCategory[]>(
		getRoleCategories([
			{
				Param: "RoleId",
				Value: role,
			},
		]),
	);
	return (
		<PageWrapper roles={roles} currentRoleCategories={roleCategories}>
			<QuestionsRoleList role={role} />
		</PageWrapper>
	);
};
export default CategoryRoleQuestions;
