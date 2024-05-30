export type CategoryWithRating = {
	Rating: number | null;
	Category: string;
	CategoryId: string;
};

export type DashboardProjectType = {
    UniqueId: string,
    ClientId: string,
    ProjectName: string,
    ProjectDesc: string,
    Rating: string | number | null,
    SuccessPredictorPercent: string | number,
    RatingByCategories: CategoryWithRating[]
}

