import { object, string } from "yup";
import memoizeOne from "memoize-one";

const validationSchema = memoizeOne(() => {
	return object().shape({
		ActionItems: string().required("ActionItems Is Required"),
		Mitigation: string().required("Mitigation Is Required"),
		RiskDesc: string().required("Risk Descprition Is Required"),
	});
});

export default validationSchema;
