import { object, string, array } from "yup";
import memoizeOne from "memoize-one";

const validationSchema = memoizeOne(() => {
	const required = "Required";
	return object().shape({
		mapping: array().of(
			object()
				.shape({
					roleId: string().uuid().required(required),
					questions: array().of(string().uuid().required(required)),
				})
				.required(required),
		),
	});
});

export default validationSchema;
