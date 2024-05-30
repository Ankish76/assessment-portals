const Card: React.FunctionComponent<{ children?: any; bgColor?: string }> = ({
	bgColor = "bg-white",
	children,
}) => {
	return (
		<div className={`${bgColor} rounded-md shadow`}>
			<div className="p-3">{children}</div>
		</div>
	);
};

export default Card;
