import { object, string, array } from "yup";
import memoizeOne from "memoize-one";

const validationSchema = memoizeOne(() => {
	const required = "Required";
	return object().shape({
		selected: array().of(
			object()
				.shape({
					categoryId: string().uuid().required(required),
				})
				.required(required),
		),
	});
});

export default validationSchema;
