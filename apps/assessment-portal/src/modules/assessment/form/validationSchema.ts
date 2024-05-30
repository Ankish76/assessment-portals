import { date, object, string } from "yup";
import memoizeOne from "memoize-one";

const validationSchema = memoizeOne(() => {
	return object().shape({
		comments: string().required("comments Is Required"),
	});
});

export default validationSchema;
