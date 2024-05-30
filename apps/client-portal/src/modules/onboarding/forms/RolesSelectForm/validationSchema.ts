import { object, string, array } from "yup";
import memoizeOne from "memoize-one";

const validationSchema = memoizeOne(() => {
  const required = "Required";
  return object().shape({
    selected: array().of(string().uuid().required(required)),
    // added: array().of(string().required(required)),
  });
});

export default validationSchema;
