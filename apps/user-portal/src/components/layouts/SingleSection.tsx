const SingleSection: React.FunctionComponent<{
	title: string;
	backgroundColor?: string;
	count?: any;
	children?: any;
	button?: any;
}> = ({ title, button, backgroundColor, count, children }) => {
	return (
		<div
			className={`${backgroundColor} py-6 px-4 flex flex-col h-full max-h-screen`}
		>
			<div className={`flex justify-between items-center`}>
				<div className="flex items-center">
					{title && (
						<span className="text-[30px] font-medium pr-2">
							{title}
						</span>
					)}
					{count && <span className="count">{count}</span>}
				</div>
				{button && <span>{button}</span>}
			</div>
			<div>{children}</div>
		</div>
	);
};

export default SingleSection;
