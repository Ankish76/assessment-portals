import React, { useRef, useState } from "react";

type Props = {
	fileChange: any;
	type?: string;
	className?: string;
};
const DropZone = ({ fileChange, type = "default", className = "" }: Props) => {
	const inputRef: any = useRef(null);
	const [dragging, setDragging] = useState(false);

	const handleClick = () => {
		inputRef?.current.click();
	};

	const handleDragEnter = (e: any) => {
		e.preventDefault();
		setDragging(true);
	};

	const handleDragLeave = () => {
		setDragging(false);
	};

	const handleDrop = (e: any) => {
		e.preventDefault();
		setDragging(false);
		const file = e.dataTransfer.files[0];
		fileChange(file);
	};

	const handleFileInput = (e: any) => {
		fileChange(e.target.files[0]);
	};

	return (
		<div
			className={`file-input ${
				dragging ? "dragging" : ""
			} w-full p-2 ${className}`}
			onDragEnter={handleDragEnter}
			onDragOver={e => e.preventDefault()}
			onDragLeave={handleDragLeave}
			onDrop={handleDrop}
		>
			{type === "image" ? (
				<div>
					<input
						type="file"
						ref={inputRef}
						name="file_upload"
						className="hidden"
						onChange={e => handleFileInput(e)}
						accept="application/msword, application/vnd.ms-excel, application/vnd.ms-powerpoint,text/plain, application/pdf, application/vnd.openxmlformats-officedocument.wordprocessingml.document, video/*, image/png, image/jpeg"
					/>
					<div
						onClick={handleClick}
						className="flex cursor-pointer text-dark-200 bg-light-100 rounded-full items-center justify-center lg:h-32 md:h-32 sm:h-32 h-24 lg:w-32 md:w-32 sm:w-32 w-24 text-[30px]"
					>
						1:1
					</div>
				</div>
			) : type === "logo" ? (
				<div>
					<input
						type="file"
						ref={inputRef}
						name="file_upload"
						className="hidden"
						onChange={e => handleFileInput(e)}
						accept="application/msword, application/vnd.ms-excel, application/vnd.ms-powerpoint,text/plain, application/pdf, application/vnd.openxmlformats-officedocument.wordprocessingml.document, video/*, image/png, image/jpeg"
					/>
					<div
						onClick={handleClick}
						className="flex cursor-pointer items-center justify-center h-auto w-[178px]"
					>
						<img
							alt={"Event Image"}
							src={
								"https://member-portal-new-01-20.s3.us-east-2.amazonaws.com/placeholder-16-9-logo.png"
							}
							className="object-scale-down h-auto w-[178px]"
						/>
					</div>
				</div>
			) : type === "EventImage" ? (
				<div className="">
					<input
						type="file"
						ref={inputRef}
						name="file_upload"
						className="hidden"
						onChange={e => handleFileInput(e)}
						accept="application/msword, application/vnd.ms-excel, application/vnd.ms-powerpoint,text/plain, application/pdf, application/vnd.openxmlformats-officedocument.wordprocessingml.document, video/*, image/png, image/jpeg"
					/>
					<div
						onClick={handleClick}
						className="-m-2.5 p-1.5 flex cursor-pointer items-center justify-center bg-white rounded border-border border-dashed border-2"
					>
						<img
							alt={"Event Image"}
							src={
								"https://membio-s3-poc.s3.amazonaws.com/placeholder-16-9-event.png"
							}
							className="object-cover w-fit"
						/>
					</div>
				</div>
			) : (
				<label className="flex bg-slate-100 justify-center w-full h-40 px-4 transition border-gray-500 border-dashed border rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none ">
					<span className="flex text-gray-600 items-center justify-center gap-2 text-center gap-x-1 flex-col">
						<span>Drag and drop</span>{" "}
						<span className="italic"> - or - </span>
						<button
							className="bg-dark-100 text-white rounded-md w-fit text-sm  h-8 px-3 items-center justify-around"
							onClick={handleClick}
						>
							Browse
						</button>
					</span>
					<input
						type="file"
						ref={inputRef}
						name="file_upload"
						className="hidden"
						onChange={e => handleFileInput(e)}
						accept="application/msword, application/vnd.ms-excel, application/vnd.ms-powerpoint,text/plain, application/pdf, application/vnd.openxmlformats-officedocument.wordprocessingml.document, video/*, image/png, image/jpeg"
					/>
				</label>
			)}
		</div>
	);
};

export default DropZone;
