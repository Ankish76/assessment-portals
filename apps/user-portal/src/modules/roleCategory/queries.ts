import { objectToParams } from "@root/helpers/convertToParams";
import { FeedbackPropType, GetFeedbackType } from "./interfaces";

export const getAllUserProjects = (values: any) => {
	const paramValues = objectToParams(values);
	const query = {
		QueryOperation: "select",
		QueryName: "Client_GetAll_UserProjects",
		ClientId: "Finilio",
		ParamValues: paramValues,
	};
	return {
		method: "POST",
		body: JSON.stringify(query),
	};
}

export const getRoleCategories = (values: any) => {
	const paramValues = objectToParams(values);
	const query = {
		QueryOperation: "select",
		QueryName: "Client_Get_RoleCategories",
		ClientId: "Finilio",
		ParamValues: paramValues,
	};
	return {
		method: "POST",
		body: JSON.stringify(query),
	};
};

export const getCategoryQuestions = (values: any) => {
	const paramValues = objectToParams(values);
	const query = {
		QueryOperation: "select",
		QueryName: "Client_GetCategoryQuestions",
		ClientId: "Finilio",
		ParamValues: paramValues,
	};
	return {
		method: "POST",
		body: JSON.stringify(query),
	};
};

export const getUserFeedbacks = (values: GetFeedbackType) => {
	const paramValues = [
		{
			Param: "UserIdCondition",
			Value: `AND a.\"UserId\" = '${values.UserId}'`,
		},
		{
			Param: "ProjectId",
			Value: values.ProjectId,
		},
		{
			Param: "CategoryIdCondition",
			Value: `AND a.\"CategoryId\" = '${values.CategoryId}'`,
		},
		{
			Param: "CategoryQuestionIdCondition",
			Value: `AND a.\"CategoryQuestionId\" = '${values.CategoryQuestionId}'`,
		},
		{
            Param: "IsAnonymousCondition",
            Value: "",
        }
	];

	const query = {
		QueryOperation: "select",
		QueryName: "Client_Get_UserFeedbacks",
		ClientId: "Finilio",
		ParamValues: paramValues,
	};
	return {
		method: "POST",
		body: JSON.stringify(query),
	};
};

export const addUserFeedback = (values: FeedbackPropType) => {
	const paramValues = [
		{
			Param: "ProjectId",
			Value: values.ProjectId,
		},
		{
			Param: "UserId",
			Value: values.UserId,
		},
		{
			Param: "CategoryId",
			Value: values.CategoryId,
		},
		{
			Param: "CategoryQuestionId",
			Value: values.CategoryQuestionId,
		},
		{
			Param: "Rating",
			Value: values.rating,
		},
		{
			Param: "Comments",
			Value: values.comment,
		},
		{
			Param: "IsAnonymous",
			Value: values.isAnonymous || false
		}
	];

	const query = {
		QueryOperation: "insert",
		QueryName: "Client_Add_UserFeedback",
		ClientId: "Finilio",
		ParamValues: paramValues,
	};
	return {
		method: "POST",
		body: JSON.stringify(query),
	};
};
