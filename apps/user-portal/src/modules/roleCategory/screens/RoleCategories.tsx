import { useStore } from "@root/lib/zustand/store";
import CategoryQuestions from "./CategoryQuestions";
import { useEffect } from "react";
import { ProjectRoleCategory, RoleCategoryType } from "../interfaces";

type PropTypes = {
	slug: string;
	categoryId: string;
};
const RoleCategory: React.FC<PropTypes> = ({ categoryId, slug }) => {
	const roleCategories = useStore(s => s.projectRoleCategories);
	const categoryData = roleCategories
		.find((rc: ProjectRoleCategory) => rc.ProjectId === slug)
		?.RoleCategories.find(
			(rc: RoleCategoryType) => rc.CategoryId === categoryId,
		);
	const getRoleCategoryQuestions = useStore(m => m.getRoleCategoryQuestions);

	useEffect(() => {
		getRoleCategoryQuestions(slug, categoryId);
	}, []);
	return (
		<>
			{categoryData ? (
				<>
					<div className="font-bold text-xl m-5 p-3 bg-white ">
						Category : {categoryData.Category}
						<CategoryQuestions
							CategoryId={categoryData.CategoryId}
							ProjectId={slug}
						/>
					</div>
				</>
			) : null}
		</>
	);
};
export default RoleCategory;
