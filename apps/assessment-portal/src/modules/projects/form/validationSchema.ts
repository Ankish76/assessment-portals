import { object, string } from "yup";
import memoizeOne from "memoize-one";

const validationSchema = memoizeOne(() => {
	return object().shape({
		ProjectDesc: string().required("Name Is Required"),
	});
});

export default validationSchema;
