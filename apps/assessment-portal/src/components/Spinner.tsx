const Spinner = ({
	spinnerClassName = "w-8 h-8",
	containerClassName = "py-2",
}) => {
	return (
		<div className={`flex flex-col items-center ${containerClassName}`}>
			<div
				className={`animate-spin inline-block ${spinnerClassName} border-4 rounded-full text-gray-300`}
				role="status"
				style={{
					verticalAlign: "-0.125rem",
					border: "0.25em solid",
					borderRightColor: "transparent",
				}}
			></div>
		</div>
	);
};

export default Spinner;
