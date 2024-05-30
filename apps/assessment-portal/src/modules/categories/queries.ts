import clientConstants from "@root/constants/info";
import { ParamValue } from "@root/types";

export const getAllCategories = () => {
	const query = {
		QueryOperation: "select",
		QueryName: "Client_GetAll_Categories",
		ClientId: clientConstants.ClientId,
		ParamValues: [],
	};
	return {
		method: "POST",
		body: JSON.stringify(query),
	};
};

export const addCategory = (name: string, desc: string) => {
	const query = {
		QueryOperation: "insert",
		QueryName: "Client_Add_Category",
		ClientId: clientConstants.ClientId,
		ParamValues: [
			{
				Param: "Category",
				Value: name,
			},
			{
				Param: "Desc",
				Value: desc,
			},
		],
	};
	return {
		method: "POST",
		body: JSON.stringify(query),
	};
};

export const updateCategory = (id: string, name: string, desc: string) => {
	const query = {
		QueryOperation: "update",
		QueryName: "Client_Update_Category",
		ClientId: clientConstants.ClientId,
		ParamValues: [
			{
				Param: "CategoryId",
				Value: id,
			},
			{
				Param: "Category",
				Value: name,
			},
			{
				Param: "Desc",
				Value: desc,
			},
		],
	};
	return {
		method: "POST",
		body: JSON.stringify(query),
	};
};

export const deleteCategory = (id: string) => {
	const query = {
		QueryOperation: "delete",
		QueryName: "Client_Delete_Category",
		ClientId: clientConstants.ClientId,
		ParamValues: [
			{
				Param: "CategoryId",
				Value: id,
			},
		],
	};
	return {
		method: "POST",
		body: JSON.stringify(query),
	};
};

export const getAllCategoryRoleQuestions = (paramValues: ParamValue[]) => {
	const query = {
		QueryOperation: "select",
		QueryName: "Client_GetCategoryRoleQuestions",
		ClientId: clientConstants.ClientId,
		ParamValues: paramValues,
	};
	return {
		method: "POST",
		body: JSON.stringify(query),
	};
};

export const getRoleCategories = (paramValues: ParamValue[]) => {
	const query = {
		QueryOperation: "select",
		QueryName: "Client_Get_RoleCategories",
		ClientId: clientConstants.ClientId,
		ParamValues: paramValues,
	};
	return {
		method: "POST",
		body: JSON.stringify(query),
	};
};
