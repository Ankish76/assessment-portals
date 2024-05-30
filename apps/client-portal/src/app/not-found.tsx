"use client";
import Error from "next/error";

const CustomErrorComponent = () => {
	return <Error statusCode={404} />;
};

export default CustomErrorComponent;
