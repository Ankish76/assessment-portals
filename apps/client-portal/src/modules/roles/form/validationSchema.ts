import { object, string } from "yup";
import memoizeOne from "memoize-one";

const validationSchema = memoizeOne(() => {
	return object().shape({
		Role: string().required("Role Is Required"),
		Desc: string().required("Description Is Required"),
	});
});

export default validationSchema;
