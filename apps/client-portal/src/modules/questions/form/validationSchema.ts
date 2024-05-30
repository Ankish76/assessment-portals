import { object, string } from "yup";
import memoizeOne from "memoize-one";

const validationSchema = memoizeOne(() => {
	return object().shape({
		Question: string().required("Question Is Required"),
	});
});

export default validationSchema;
