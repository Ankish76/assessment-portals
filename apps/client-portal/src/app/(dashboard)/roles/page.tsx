import PageWrapper from "@components/layouts/PageWrapper";
import { getAllRoles } from "@root/modules/roles/queries";
import RoleList from "@root/modules/roles/screens/List";
import { serverAPICaller } from "@utils/handler/server";
import { Role } from "@root/modules/roles/interfaces";

export default async function Home() {
	const roles = await serverAPICaller<Role[]>(getAllRoles());
	return (
		<PageWrapper roles={roles}>
			<RoleList />
		</PageWrapper>
	);
}
