import PageWrapper from "@components/layouts/PageWrapper";
import { getAllUsers } from "@root/modules/users/queries";
import UsersList from "@root/modules/users/screens/UsersList";
import { serverAPICaller } from "@utils/handler/server";
import { User } from "@root/modules/users/interfaces";

const Users = async () => {
	const users = await serverAPICaller<User[]>(getAllUsers());
	return (
		<PageWrapper users={users}>
			<UsersList />
		</PageWrapper>
	);
};

export default Users;
