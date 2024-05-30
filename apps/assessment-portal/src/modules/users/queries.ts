import clientConstants from "@root/constants/info";
import { objectToParams } from "@root/helpers/convertToParams";

export const getAllUsers = () => {
	const query = {
		QueryOperation: "select",
		QueryName: "Client_GetAll_Users",
		ClientId: clientConstants.ClientId,
		ParamValues: [],
	};
	return {
		method: "POST",
		body: JSON.stringify(query),
	};
};

export const addUpdateUser = (values: any) => {
	const paramValues = objectToParams(values);
	const query = {
		QueryOperation: "upsert",
		QueryName: "Client_Add_Update_User",
		ClientId: clientConstants.ClientId,
		ParamValues: paramValues,
	};
	return {
		method: "POST",
		body: JSON.stringify(query),
	};
};

export const deleteUser = (value: any) => {
	const paramValues = objectToParams(value);
	const query = {
		QueryOperation: "update",
		QueryName: "Client_Delete_User",
		ClientId: clientConstants.ClientId,
		ParamValues: paramValues,
	};
	return {
		method: "POST",
		body: JSON.stringify(query),
	};
};
