export interface Project {
	UniqueId: string;
	ClientId: string;
	ProjectName: string;
	ProjectDesc: string;
	PlannedDeliveryDate: Date | string;
	NewDeliveryDate: Date | string;
	WorkPlanned: string;
	WorkCompleted: number | string | null;
	CapacityPlanned: number | string | null;
	CapacityUsed: number | string | null;
	BudgetPlanned: number | string | null;
	BudgetUsed: number | string | null;
	IsActive: boolean;
}

export type ProjectInput = Omit<Project, "UniqueId" | "ClientId"> & {
	ProjectId: string;
};
