import { object, string } from "yup";
import memoizeOne from "memoize-one";

const validationSchema = memoizeOne(() => {
	return object().shape({
		Category: string().required("Category Is Required"),
		Desc: string().required("Description Is Required"),
	});
});

export default validationSchema;
