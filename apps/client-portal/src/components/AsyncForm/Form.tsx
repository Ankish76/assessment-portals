import React from "react";
import {
	ValidationErrors,
	FORM_ERROR,
	setIn,
	FormApi,
	SubmissionErrors,
} from "final-form";
import { Form, FormProps, FormRenderProps } from "react-final-form";
import { ValidationError, Schema } from "yup";
import deepmerge from "deepmerge";

export type FinalFromProps = Omit<
	FormProps,
	"render" | "component" | "children"
> & {
	children: React.FC<
		Partial<
			FormRenderProps<Record<string, any>, Partial<Record<string, any>>>
		>
	>;
	name: string;
	validationSchema?: Schema;
	resetOnSuccess?: boolean;
	preSubmitAction?: () => Promise<any>;
	onSubmitSuccess?: (data: Record<string, any>) => any;
	transformValues?: (data: Record<string, any>) => any;
	preSubmitTransform?: (data: any) => any;
	validationError?: Record<string, any>;
};

export type RenderProps = Partial<FormRenderProps>;

const convertDotKey = (
	errObj: Record<string, any>,
	baseObject: Record<string, any> = {},
) => {
	const result: Record<string, any> = {};
	Object.entries(errObj).forEach(([key, value]) => {
		key.split(".").reduce(
			(r, e, i, arr) => (r[e] = r[e] || (arr[i + 1] ? {} : value[0])),
			result,
		);
	});
	return deepmerge(baseObject, result);
};

const convertSeverErrors = (err: any) => {
	const message = "Invalid form values";
	try {
		let validationErrors: Record<string, any> = {};

		if (err && Array.isArray(err)) {
			for (let x = 0; x < err.length; x++) {
				const error = err[x];
				if (error.state) {
					Object.keys(error.state).forEach(field => {
						validationErrors[field] = error.state[field][0];
					});
				} else if (error.validationErrors) {
					validationErrors = convertDotKey(error.validationErrors);
					break;
				}
				validationErrors.error = error.message || message; // eslint-disable-line
			}
		}
		return validationErrors;
	} catch (err1) {
		return {
			error: message,
		};
	}
};

const defaultSubscription = {
	submitting: false,
	pristine: false,
	invalid: false,
	values: false,
	validating: false,
	errors: false,
};

const FinalFrom: React.FC<FinalFromProps> = ({
	subscription = defaultSubscription,
	initialValues,
	children,
	onSubmit,
	validate,
	validationSchema,
	keepDirtyOnReinitialize = true,
	mutators,
	decorators,
	validateOnBlur,
	debug,
	name,
	transformValues,
	preSubmitAction,
	preSubmitTransform,
	onSubmitSuccess,
	resetOnSuccess,
	validationError,
}) => {
	// use memoized values on form if performance is very low it may cause some other problems
	// const mutatorsMemo = useMemo(() => mutators, [mutators]);
	// const subscriptionMemo = useMemo(() => subscription, [subscription]);
	// const decoratorsMemo = useMemo(() => decorators, [decorators]);

	const handleSubmitSuccess = React.useCallback(
		(form: FormApi<Record<string, any>, Record<string, any>>, res: any) => {
			if (resetOnSuccess && form.reset) {
				setTimeout(() => {
					form.reset();
				}, 100);
			}
			if (onSubmitSuccess) {
				onSubmitSuccess(res);
			}
		},
		[onSubmitSuccess, resetOnSuccess],
	);
	const handleValidate = React.useCallback(
		async (values: { [key: string]: any }) => {
			try {
				const newValues = transformValues
					? transformValues(values)
					: { ...values };
				if (validationSchema) {
					try {
						await validationSchema.validate(newValues, {
							context: { ...values, ...newValues }, // we want access to all values
							abortEarly: false,
						});
					} catch (err) {
						if (!(err instanceof ValidationError)) {
							return {
								[FORM_ERROR]: "Invalid form values",
							};
						}
						let errors: ValidationErrors = {};
						if (err && err.inner) {
							if (err.inner.length === 0 && err.path) {
								setIn(errors, err.path, err.message);
							} else {
								for (const error of err.inner) {
									if (error.path && !errors[error.path]) {
										errors = setIn(
											errors,
											error.path,
											error.message,
										);
									}
								}
							}
						}
						return errors;
					}
				}
				return validate ? validate(newValues) : {};
			} catch (err) {
				if (
					err instanceof ValidationError &&
					!err.message.includes("errors occurred")
				) {
					return err;
				} else if (err instanceof ValidationError) {
					return err;
				}
				throw err;
			}
		},
		[transformValues, validationSchema, validate],
	);

	const handleSubmit = React.useCallback(
		async (
			values: Record<string, any>,
			form: FormApi<Record<string, any>, Record<string, any>>,
			callback?: (errors?: SubmissionErrors) => void,
		) => {
			try {
				if (preSubmitAction) {
					await preSubmitAction();
				}
				let data = transformValues ? transformValues(values) : values;

				data = preSubmitTransform ? preSubmitTransform(data) : data;
				const res = await onSubmit(data, form, callback);
				if (res === undefined) {
					throw new Error(
						`You're not returning submit response for Form: ${name}`,
					);
				}
				handleSubmitSuccess(form, res);
			} catch (err: any) {
				const message = `Inavlid from values`;
				// Convert for graphQL errors
				if (err.server) {
					if (typeof err.graphQLErrors === "string") {
						return {
							[FORM_ERROR]: err.graphQLErrors,
						};
					}
					const errors = convertSeverErrors(err.server);
					if (Object.keys(errors).length) {
						return {
							[FORM_ERROR]:
								typeof errors.error === "string"
									? errors.error
									: `Please correct the form`,
							...errors,
							...(validationError || {}),
						};
					} else if (err.message.startsWith("ValidationError")) {
						console.warn(err);
					}
				} else if (err.message.startsWith("ValidationError")) {
					console.warn(err);
				}
				console.warn(err);
				// addError(message);
				return {
					[FORM_ERROR]: message,
				};
			}
		},
		[
			handleSubmitSuccess,
			transformValues,
			preSubmitTransform,
			preSubmitAction,
			onSubmit,
			name,
			validationError,
		],
	);
	return (
		<Form
			name={name}
			onSubmit={handleSubmit}
			validate={handleValidate}
			validateOnBlur={validateOnBlur}
			initialValues={initialValues}
			keepDirtyOnReinitialize={keepDirtyOnReinitialize}
			mutators={mutators}
			subscription={subscription}
			decorators={decorators}
			// mutators={mutatorsMemo}
			// subscription={subscriptionMemo}
			// decorators={decoratorsMemo}
			debug={debug}
		>
			{children}
		</Form>
	);
};

export default FinalFrom;
