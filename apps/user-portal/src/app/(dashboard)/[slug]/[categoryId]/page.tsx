"use client";
import RoleCategory from "@root/modules/roleCategory/screens/RoleCategories";
import { Page } from "@root/types";

const ProjectContent: Page<{slug: string, categoryId: string }> = ({ params }) => {
	return <RoleCategory categoryId={params.categoryId} slug={params.slug}/>;
};

export default ProjectContent;
