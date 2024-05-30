import clientConstants from "@root/constants/info";

export const getAllRoles = () => {
	const query = {
		QueryOperation: "select",
		QueryName: "Client_GetAll_Roles",
		ClientId: clientConstants.ClientId,
		ParamValues: [],
	};
	return {
		method: "POST",
		body: JSON.stringify(query),
	};
};

export const addRole = (name: string, desc: string) => {
	const query = {
		QueryOperation: "insert",
		QueryName: "Client_Add_Role",
		ClientId: clientConstants.ClientId,
		ParamValues: [
			{
				Param: "Role",
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

export const updateRole = (id: string, name: string, desc: string) => {
	const query = {
		QueryOperation: "update",
		QueryName: "Client_Update_Role",
		ClientId: clientConstants.ClientId,
		ParamValues: [
			{
				Param: "RoleId",
				Value: id,
			},
			{
				Param: "Role",
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

export const deleteRole = (id: string) => {
	const query = {
		QueryOperation: "delete",
		QueryName: "Client_Delete_Role",
		ClientId: clientConstants.ClientId,
		ParamValues: [
			{
				Param: "RoleId",
				Value: id,
			},
		],
	};
	return {
		method: "POST",
		body: JSON.stringify(query),
	};
};
