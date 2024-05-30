import memoizeOne from "memoize-one";
import { object, ref, string } from "yup";

export const emailRegex =
	/(?:[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-zA-Z0-9-]*[a-zA-Z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

const validationSchema = memoizeOne(() => {
	return object().shape({
		Fullname: string()
			.required("Please enter User Name.")
			.matches(
				/^[a-zA-Z0-9]+([._\s]?[a-zA-Z0-9]+)*$/,
				"Please enter Valid User Name.",
			),

		Email: string()
			.required("Please add Email.")
			.matches(emailRegex, "Please enter Valid Email."),

		Phone: string()
			.required("Please add Phone.")
			.matches(/^\d{10}$/, "Please enter Valid Phone Number."),

		Password: string()
			.matches(
				/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
				"Password must contain at least 8 characters, including one uppercase letter, one lowercase letter, one number, and one special character",
			)
			.required("Please add Password"),
		ConfirmPassword: string()
			.oneOf([ref("Password"), undefined], "Passwords must match")
			.required("Confirm Password is required"),
	});
});

export default validationSchema;
