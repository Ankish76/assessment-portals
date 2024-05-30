export interface Project {
	UniqueId: string;
	ClientId: string;
	ProjectName: string;
	ProjectDesc: string;
	PlannedDeliveryDate: string;
	NewDeliveryDate: string;
	WorkPlanned: string;
	WorkCompleted: string | null;
	CapacityPlanned: string | null;
	CapacityUsed: string | null;
	BudgetPlanned: string | null;
	BudgetUsed: string | null;
	IsActive: boolean;
}

export type ProjectInput = Omit<Project, "UniqueId" | "ClientId"> & {
	ProjectId: string;
};
