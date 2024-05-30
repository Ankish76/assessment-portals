import clientConstants from "@root/constants/info";
import { ProjectInput } from "./interfaces";

export const getAllProjects = () => {
	const query = {
		QueryOperation: "select",
		QueryName: "Client_GetAll_Projects",
		ClientId: clientConstants.ClientId,
		ParamValues: [],
	};
	return {
		method: "POST",
		body: JSON.stringify(query),
	};
};

export const getProject = (projectId: string) => {
	const query = {
		QueryOperation: "select",
		QueryName: "Client_Get_Project",
		ClientId: clientConstants.ClientId,
		ParamValues: [
			{
				Param: "ProjectId",
				Value: projectId,
			},
		],
	};
	return {
		method: "POST",
		body: JSON.stringify(query),
	};
};

export const addOrUpdateProject = ({
	ProjectId,
	ProjectName,
	ProjectDesc,
	PlannedDeliveryDate,
	NewDeliveryDate,
	WorkPlanned,
	WorkCompleted,
	CapacityPlanned,
	CapacityUsed,
	BudgetPlanned,
	BudgetUsed,
}: ProjectInput) => {
	const ParamValues = [
		{
			Param: "ProjectName",
			Value: ProjectName,
		},
		{
			Param: "ProjectDesc",
			Value: ProjectDesc,
		},
		{
			Param: "PlannedDeliveryDate",
			Value: PlannedDeliveryDate,
		},
		{
			Param: "NewDeliveryDate",
			Value: NewDeliveryDate,
		},
		{
			Param: "WorkPlanned",
			Value: WorkPlanned,
		},
		{
			Param: "WorkCompleted",
			Value: WorkCompleted,
		},
		{
			Param: "CapacityPlanned",
			Value: CapacityPlanned,
		},
		{
			Param: "CapacityUsed",
			Value: CapacityUsed,
		},
		{
			Param: "BudgetPlanned",
			Value: BudgetPlanned,
		},
		{
			Param: "BudgetUsed",
			Value: BudgetUsed,
		},
	];
	if (ProjectId) {
		ParamValues.push({
			Param: "ProjectId",
			Value: ProjectId,
		});
	}
	const query = {
		QueryOperation: "upsert",
		QueryName: "Client_Add_Update_Project",
		ClientId: clientConstants.ClientId,
		ParamValues: ParamValues.map(m => ({ ...m, Value: m.Value || "" })),
	};
	return {
		method: "POST",
		body: JSON.stringify(query),
	};
};

// export const deleteProject = (id: string) => {
// 	const query = {
// 		QueryOperation: "delete",
// 		QueryName: "Client_Delete_Project",
// 		ClientId: clientConstants.ClientId,
// 		ParamValues: [
// 			{
// 				Param: "ProjectId",
// 				Value: id,
// 			},
// 		],
// 	};
// 	return {
// 		method: "POST",
// 		body: JSON.stringify(query),
// 	};
// };
