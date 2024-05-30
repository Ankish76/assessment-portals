"use client";
import { useCallback, useEffect } from "react";
import { Form, SubmitButton, TextInputField } from "@root/components/AsyncForm";
import { useRouter } from "next/navigation";
import { object, string } from "yup";
import memoizeOne from "memoize-one";
import { useStore } from "@root/lib/zustand/store";

const initialValues = () => {
	return {
		Email: "",
		Password: "",
	};
};

export const emailRegex =
	/(?:[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-zA-Z0-9-]*[a-zA-Z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

const validationSchema = memoizeOne(() => {
	return object().shape({
		Email: string()
			.required("Please add Email.")
			.matches(emailRegex, "Please enter Valid Email."),
		Password: string().required("Required"),
	});
});

const LoginForm = () => {
	const router = useRouter();
	const userLogin = useStore(m => m.userLogin);
	const loginError = useStore(m => m.loginError);
	const loading = useStore(m => m.loginSubmitting);
	const user = useStore(m => m.user);

	const onLogin = useCallback(async (input: any) => {
		const params = [
			{
				Param: "Email",
				Value: input?.Email,
			},
			{
				Param: "Password",
				Value: input.Password,
			},
		];
		await userLogin(params);
		return true;
	}, []);

	useEffect(() => {
		const adminUserData = localStorage.getItem("AssessmentUserData");
		if (
			user?.UniqueId ||
			(adminUserData && JSON.parse(adminUserData)?.UniqueId)
		) {
			router.push("/");
		}
	}, [user?.UniqueId]);

	return (
		<div>
			<section>
				<div className="flex" style={{ backgroundColor: "#F5F6FB" }}>
					<div
						className="banner-img relative bg-cover lg:w-11/12 md:w-1/2 bg-no-repeat h-screen"
						style={{
							backgroundImage: `url("https://cdn.clareitysecurity.net/sys/hgar/HGAR_loginD42.png")`,
						}}
					></div>
					{/* <div
						className="circle bg-cover 4xl:hidden 3xl:block xl:block lg:block md:block hidden fixed bg-no-repeat h-full z-10"
						style={{
							backgroundPositionX: "right",
							backgroundPositionY: "center",
							marginLeft: "70rem",
							width: "100vh",
							backgroundImage: `url("https://cdn.clareitysecurity.net/login-theme/slate-bg-xl.png")`,
						}}
					></div> */}

					<div className="login-section absolute xl:right-16 lg:right-16 md:right-16 right-0 mx-auto mt-40 z-20 ml-5 ">
						<div
							className="shadow-xl bg-white w-full p-14"
							style={{ borderRadius: "30px" }}
						>
							<div className="logo">
								<p className="text-3xl text-center font-mono font-bold">
									Aadya
									<span
										className="text-red-500 !text-4xl"
										style={{ color: "#d7b5cf" }}
									>
										Tek
									</span>
								</p>
							</div>
							<Form
								onSubmit={onLogin}
								validateOnBlur
								name="login-form"
								onSubmitSuccess={() => {}}
								initialValues={initialValues()}
								validationSchema={validationSchema()}
							>
								{meta => {
									return (
										<>
											<div className="form-wrapper mt-5">
												<label
													htmlFor=""
													className="text-base"
													style={{ color: "#585C71" }}
												>
													Member ID
												</label>
												<TextInputField
													label="Email"
													name="Email"
													fullWidth
													placeholder="Email"
													autoFocus
													className="p-5 rounded-lg w-96"
													onKeyDown={e => {
														if (e.key === "Enter") {
															meta?.form?.submit();
														}
													}}
												/>
												<label
													htmlFor=""
													className="text-base"
													style={{ color: "#585C71" }}
												>
													Password
												</label>
												<TextInputField
													label="Password"
													type="password"
													name="Password"
													fullWidth
													placeholder="Password"
													className="p-5 rounded-lg w-96"
													onKeyDown={e => {
														if (e.key === "Enter") {
															meta?.form?.submit();
														}
													}}
												/>
											</div>
											{loginError && (
												<div className="pt-2 text-xs text-red-200 font-medium">
													{loginError}
												</div>
											)}
											<a
												href=""
												className="underline text-blue-900 float-right"
											>
												Forgot Password?
											</a>
											<p
												className="text-wrap w-80 mt-10 leading-5"
												style={{ color: "#585C71" }}
											>
												Passwords are case-sensitive.
												Please be sure to check your
												Caps Lock is turned off.
											</p>
											{/* <span className="flex w-80">
                                    <p style={{ color: "#585C71" }}>Not a member?</p>
                                    <a href="" className="ml-1  underline text-right" style={{ color: "#585C71" }}> Register for classes here.</a>
                                </span> */}
											<div className="button-container flex items-center justify-center py-4 gap-[6px] mt-2">
												<SubmitButton
													disabled={false}
													className="border !bg-dark-100 text-white border-slate-500 flex rounded-md w-fit py-1 px-4 items-center"
												>
													{loading
														? "...Submitting"
														: "Login"}
												</SubmitButton>
											</div>
										</>
									);
								}}
							</Form>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
};

export default LoginForm;
