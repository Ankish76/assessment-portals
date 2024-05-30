type Props = {
	text: string;
	icon: React.ReactNode;
	classNames: string;
	onClick?: () => void;
};

const ButtonWithIcon = ({ text, icon, classNames, onClick }: Props) => {
	return (
		<button
			className={`flex ${classNames ? classNames : ""}`}
			onClick={onClick}
		>
			<div className="mr-2">{icon}</div>
			<div>{text}</div>
		</button>
	);
};

export default ButtonWithIcon;
