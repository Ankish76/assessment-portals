import { FaXmark } from "react-icons/fa6";
export interface ModalProps {
	show?: boolean;
	close?: Function;
	children?: React.ReactNode;
	className?: string;
	containerClassName?: string;
	closeOutSide?: boolean;
}
const Modal: React.FC<ModalProps> = ({
	show,
	close,
	children,
	className,
	containerClassName,
	closeOutSide = true,
}) => {
	return (
		<>
			{show && (
				<div
					className={`${
						containerClassName ||
						"p-2 fixed h-full w-full top-0 left-0 flex items-center justify-center z-50 flex-col backdrop-blur-sm "
					}`}
				>
					<div
						className={`fixed w-full h-full bg-gray-900 opacity-50`}
						onClick={e => close && closeOutSide && close()}
					></div>
					<div
						className={`relative bg-white mx-auto shadow-lg ${
							className?.includes("overflow-y-")
								? ""
								: "overflow-y-auto"
						} ${className?.includes("w-") ? "" : "w-1/3"} ${
							className?.includes("z-") ? "" : "z-50"
						} ${className} rounded-lg`}
					>
						{close && (
							<div className="absolute right-0 grid w-auto justify-items-end z-50">
								<div
									className="mt-3 mr-3 cursor-pointer text-black"
									onClick={() => close && close()}
								>
									<FaXmark />
									&nbsp;
								</div>
							</div>
						)}
						<div className="h-full">{children}</div>
					</div>
				</div>
			)}
		</>
	);
};

export default Modal;
