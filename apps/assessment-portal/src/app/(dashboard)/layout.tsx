import Dashboard from "@root/components/layouts/Dashboard";
import PageWrapper from "@root/components/layouts/PageWrapper";

const DashboardLayout: React.FC<React.PropsWithChildren> = async ({
	children,
}) => {
	return (
		<PageWrapper>
			<Dashboard>{children}</Dashboard>
		</PageWrapper>
	);
};

export default DashboardLayout;
