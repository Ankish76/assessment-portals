"use client";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import GaugeChart from "react-gauge-chart";

ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
	ChartDataLabels,
);

import { Project } from "@root/modules/projects/interfaces";
import React, { useEffect, useMemo, useState } from "react";
import { Bar } from "react-chartjs-2";
import GaugeComponent from "react-gauge-component";
import { Labels } from "react-gauge-component/dist/lib/GaugeComponent/types/Labels";
import {
	currencyLocaleFormat,
	numberLocaleFormat,
} from "@root/helpers/numberHelpers";
import { DashboardProjectType } from "../interfaces";
import { Accordion, Button } from "flowbite-react";
import FeedbackFilters from "./FeedbackFilters";
import FeedbackList from "./FeedbackList";
import { useStore } from "@root/lib/zustand/store";
import { BsIncognito } from "react-icons/bs";
import {
	FaChevronDown,
	FaChevronUp,
	FaCirclePause,
	FaRegStar,
	FaStar,
} from "react-icons/fa6";
import { MdCancel } from "react-icons/md";
import moment from "moment";
import ProjectDetail from "@root/modules/projectDetail/screens/ProjectDetail";

const labels: Labels = {
	tickLabels: {
		// valueConfig: { formatTextValue: val => "$" + budgetUsed, fontSize: 10 },
		type: "inner",
		ticks: [
			{
				value: 0,
				valueConfig: {
					formatTextValue: val => val + "",
					style: {
						fontSize: "9px",
						fill: "#000",
						fontWeight: "600",
						width: "100%",
					},
				},
			},
			{
				value: 20,
				valueConfig: {
					formatTextValue: val => val,
					style: {
						fontSize: "9px",
						fill: "#000",
						fontWeight: "600",
						width: "100%",
					},
				},
			},
			{
				value: 40,
				valueConfig: {
					formatTextValue: val => val,
					style: {
						fontSize: "9px",
						fill: "#000",
						fontWeight: "600",
						width: "100%",
					},
				},
			},
			{
				value: 60,
				valueConfig: {
					formatTextValue: val => val,
					style: {
						fontSize: "9px",
						fill: "#000",
						fontWeight: "600",
						width: "100%",
					},
				},
			},
			{
				value: 80,
				valueConfig: {
					formatTextValue: val => val,
					style: {
						fontSize: "9px",
						fill: "#000",
						fontWeight: "600",
						width: "100%",
					},
				},
			},
			{
				value: 100,
				valueConfig: {
					formatTextValue: val => val,
					style: {
						fontSize: "9px",
						fill: "#000",
						fontWeight: "600",
						width: "100%",
					},
				},
			},
		],
	},
	valueLabel: {
		formatTextValue: val => val,
		style: { fontSize: "35px", fill: "#000" },
	},
};

const successLabels: Labels = {
	tickLabels: {
		// valueConfig: { formatTextValue: val => "$" + budgetUsed, fontSize: 10 },
		type: "inner",
		ticks: [
			{
				value: 0,
				valueConfig: {
					formatTextValue: val => val + "%",
					style: {
						fontSize: "9px",
						fill: "#000",
						fontWeight: "600",
						width: "100%",
					},
				},
			},
			{
				value: 20,
				valueConfig: {
					formatTextValue: val => val + "%",
					style: {
						fontSize: "9px",
						fill: "#000",
						fontWeight: "600",
						width: "100%",
					},
				},
			},
			{
				value: 40,
				valueConfig: {
					formatTextValue: val => val + "%",
					style: {
						fontSize: "9px",
						fill: "#000",
						fontWeight: "600",
						width: "100%",
					},
				},
			},
			{
				value: 60,
				valueConfig: {
					formatTextValue: val => val + "%",
					style: {
						fontSize: "9px",
						fill: "#000",
						fontWeight: "600",
						width: "100%",
					},
				},
			},
			{
				value: 80,
				valueConfig: {
					formatTextValue: val => val + "%",
					style: {
						fontSize: "9px",
						fill: "#000",
						fontWeight: "600",
						width: "100%",
					},
				},
			},
			{
				value: 100,
				valueConfig: {
					formatTextValue: val => val + "%",
					style: {
						fontSize: "9px",
						fill: "#000",
						fontWeight: "600",
						width: "100%",
					},
				},
			},
		],
	},
	valueLabel: {
		style: { fontSize: "35px", fill: "#000" },
	},
};
const arc = {
	colorArray: ["#5BE12C", "#EA4228"],
	subArcs: [{ limit: 10 }, { limit: 30 }, {}, {}, {}],
	padding: 0.02,
	width: 0.3,
};

const arcSuccess2 = {
	colorArray: ["#EA4228", "#FFA500", "#FFA500", "#a5e32b", "#a5e32b"],
	subArcs: [{ limit: 19 }, { limit: 35 }, { limit: 50 }, {}, {}],
	padding: 0.01,
	width: 0.3,
};

const arcSuccess = {
	colorArray: ["#EA4228", "#5BE12C"],
	subArcs: [{ limit: 10 }, { limit: 30 }, {}, {}, {}],
	padding: 0.02,
	width: 0.3,
};

const pointer = {
	elastic: false,
	animationDelay: 0,
	animationDuration: 1500,
};

function generateValues(number: number, count = 6) {
	const increment = number / (count - 1);
	const values = Array.from({ length: count }, (_, i) =>
		Math.floor(increment * i),
	);
	return values;
}

const DashboardProject = ({ project }: { project: DashboardProjectType }) => {
	const workPlanned = parseInt(project.WorkPlanned || "0", 10);
	const capacityPlanned = parseInt(project.CapacityPlanned || "0", 10);
	const budgetPlanned = parseInt(project.BudgetPlanned || "0", 10);
	const workCompleted = parseInt(project.WorkCompleted || "0", 10);
	const capacityUsed = parseInt(project.CapacityUsed || "0", 10);
	const budgetUsed = parseInt(project.BudgetUsed || "0", 10);
	const [id, setId] = useState<string>("");
	const [isOpen, setIsOpen] = useState(false);
	const getDashboardProjectRatings = useStore(
		m => m.getDashboardProjectRatings,
	);

	useEffect(() => {
		getDashboardProjectRatings({
			projectId: project.ProjectId,
			DateRangeCondition: [
				moment().subtract(3, "months").format("MM/DD/YYYY"),
				moment().format("MM/DD/YYYY"),
			],
		});
	}, [project]);
	//To avoid divide by 0 using ternery operator
	// const workCompletionPercentage = workPlanned
	// 	? workCompleted / workPlanned
	// 	: 0;
	// const budgetUsagePercentage = budgetPlanned
	// 	? budgetUsed / budgetPlanned
	// 	: 0;
	// const capacityPercentage = capacityPlanned
	// 	? capacityUsed / capacityPlanned
	// 	: 0;

	const capacityDifference =
		parseFloat(project.CapacityUsedPercent) -
		parseFloat(project.WorkCompletedPercent);

	const budgetDifference =
		parseFloat(project.BudgetUsedPercent) -
		parseFloat(project.WorkCompletedPercent);

	let projectStatusColor = "green";

	if (capacityDifference > 0 || budgetDifference > 0) {
		if (
			Math.abs(capacityDifference) <= 15 ||
			Math.abs(budgetDifference) <= 15
		) {
			projectStatusColor = "Orange";
		} else {
			projectStatusColor = "Red";
		}
	}

	if (
		parseFloat(project.BudgetUsedPercent) >
		parseFloat(project.CapacityUsedPercent)
	) {
		projectStatusColor = "Red";
	}

	const ProjectStatusAvg =
		parseFloat(project.CapacityUsedPercent) +
		parseFloat(project.BudgetUsedPercent) -
		parseFloat(project.WorkCompletedPercent);

	const handleClick = (id: string) => {
		setId(id);
		setIsOpen(!isOpen);
	};
	const budgetLabels = useMemo(() => {
		const data: Labels = {
			valueLabel: {
				formatTextValue: val => currencyLocaleFormat(budgetUsed),
				style: {
					fontSize: "35px",
					fill: "#000",
				},
			},
			tickLabels: {
				type: "inner",
				ticks: generateValues(budgetPlanned).map(
					(value: number, index) => ({
						value: index * 20,
						valueConfig: {
							formatTextValue: val => currencyLocaleFormat(value),
							style: {
								fontSize: "9px",
								fill: "#000",
								fontWeight: "600",
								width: "100%",
								zIndex: 999,
							},
						},
					}),
				),
			},
		};
		return data;
	}, [budgetUsed, budgetPlanned]);

	type ColorCode = "#EA4228" | "#FFA500" | "#a5e32b";

	const colorNames: Record<ColorCode, string> = {
		"#EA4228": "Red",
		"#FFA500": "Orange",
		"#a5e32b": "Green",
	};

	let color: ColorCode;
	let numericProjectStatusAvg = ProjectStatusAvg;
	if (numericProjectStatusAvg <= 19) {
		color = "#EA4228";
	} else if (numericProjectStatusAvg <= 50) {
		color = "#FFA500";
	} else {
		color = "#a5e32b";
	}

	const capacityLabels = useMemo(() => {
		const data: Labels = {
			tickLabels: {
				type: "inner",
				ticks: generateValues(capacityPlanned).map(
					(value: number, index) => ({
						value: index * 20,
						valueConfig: {
							formatTextValue: val => numberLocaleFormat(value),
							style: {
								fontSize: "9px",
								fill: "#000",
								fontWeight: "600",
								width: "100%",
								zIndex: 999,
							},
						},
					}),
				),
			},
			valueLabel: {
				style: {
					fontSize: "35px",
					fill: "#000",
				},
			},
		};
		return data;
	}, [capacityPlanned]);

	const workLabels = useMemo(() => {
		const data: Labels = {
			tickLabels: {
				type: "inner",
				ticks: generateValues(workPlanned).map(
					(value: number, index) => ({
						value: index * 20,
						valueConfig: {
							formatTextValue: val => numberLocaleFormat(value),
							style: {
								fontSize: "9px",
								fill: "#000",
								fontWeight: "600",
								width: "100%",
								zIndex: 999,
							},
						},
					}),
				),
			},
			valueLabel: {
				style: {
					fontSize: "35px",
					fill: "#000",
				},
			},
		};
		return data;
	}, [workPlanned]);
	return (
		<div className="m-5 border-2 bg-white rounded-lg">
			<div className="flex justify-between items-center p-5">
				<div>
					<div className="text-base font-bold">
						{project.ProjectName}
					</div>
					<div className="text-xs">{project.ProjectDesc}</div>{" "}
				</div>
				<div>
					<span className="font-semibold text-md">
						Expected Delivery Date :
					</span>{" "}
					{project.NewDeliveryDate}
				</div>
			</div>
			<div className="border-2 p-4 grid gap-2 grid-cols-5 mx-auto">
				<div className="rounded-xl pb-4 border-2">
					<div className="p-4 text-lg font-semibold text-center">
						Project Status
					</div>
					<div className="text-center items-center ">
						<div className="w-full min-h-60">
							<div className="">
								<GaugeComponent
									value={parseFloat(
										`${Number(ProjectStatusAvg).toFixed(2)}`,
									)}
									type="radial"
									labels={labels}
									arc={arcSuccess2}
									pointer={pointer}
								/>
							</div>
							{/* <Bar options={options} data={data} /> */}
						</div>
						<div className="w-full an-op">
							<div className="flex items-center justify-center">
								<div className="flex flex-col items-center">
									{/* <div
										className={`font-semibold w-5 mx-auto h-5 rounded-full ${projectStatusColor === "orange" ? "bg-orange-500" : projectStatusColor === "red" ? "bg-red-500" : ""}`}
									>
									</div> */}

									<div
										className={` text-dark-200 text-[15px] flex`}
									>
										<div
											className={`font-semibold w-5 mx-auto h-5 rounded-full mr-2 `}
											style={{ backgroundColor: color }}
										></div>
										{colorNames[color]}
										{/* {color} */}
										{/* {projectStatusColor} */}
									</div>
									<span className="text-sm">
										Project Status
									</span>
								</div>
								{/* <div className="">
									<h1 className="font-semibold">
										{workCompleted +
											"%"}
									</h1>
									<span>Work Completed</span>
								</div> */}
							</div>
						</div>
					</div>
				</div>

				<div className="rounded-xl pb-4 border-2">
					<div className="p-4 text-lg font-semibold text-center">
						Capacity
					</div>
					<div
						style={{ maxHeight: "300px" }}
						className="text-center items-center"
					>
						<div className="w-full min-h-60">
							<GaugeComponent
								value={parseFloat(
									`${project.CapacityUsedPercent}`,
								)}
								type="radial"
								labels={capacityLabels}
								arc={arc}
								pointer={pointer}
							/>
						</div>

						{/* <Bar options={options} data={budgetData} /> */}
						<div className=" w-full an-op">
							<div className="flex justify-center ">
								<div className="mr-3">
									<h1 className="font-semibold">
										{numberLocaleFormat(capacityUsed)}
									</h1>
									<span className="text-sm">
										Capacity Used
									</span>
								</div>
								<div className="">
									<h1 className="font-semibold">
										{numberLocaleFormat(capacityPlanned)}
									</h1>
									<span className="text-sm">
										Total Capacity{" "}
									</span>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="rounded-xl  pb-4 border-2">
					<div className="p-4 text-lg font-semibold text-center">
						Work Progress
					</div>
					<div className="items-center text-center flex-1">
						<div>
							<div className="w-full min-h-60">
								<GaugeComponent
									value={parseFloat(
										`${project.WorkCompletedPercent}`,
									)}
									type="radial"
									labels={workLabels}
									arc={arcSuccess}
									pointer={pointer}
								/>
							</div>
						</div>
						<div className="w-full an-op">
							<div className="flex justify-center items-center">
								<div className="mr-3">
									<h1 className="font-semibold">
										{numberLocaleFormat(workCompleted)}
									</h1>
									<span className="text-sm">
										Work Completed
									</span>
								</div>
								<div className="">
									<h1 className="font-semibold">
										{numberLocaleFormat(workPlanned)}
									</h1>
									<span className="text-sm">
										Work Planned
									</span>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="pb-4 rounded-xl border-2">
					<div className="p-4 text-lg font-semibold text-center">
						Budget
					</div>
					<div className="text-center items-center flex-1">
						<div>
							<div className="w-full min-h-60">
								<GaugeComponent
									value={parseFloat(
										`${project.BudgetUsedPercent}`,
									)}
									type="radial"
									labels={budgetLabels}
									arc={arc}
									pointer={pointer}
									className="text-black"
									// maxValue={9999999999}
								/>
							</div>
						</div>
						<div className="w-full  an-op">
							<div className="flex justify-center items-center">
								<div className="mr-3">
									<h1 className="font-semibold">
										{currencyLocaleFormat(budgetUsed)}
									</h1>
									<span className="text-sm">Budget Used</span>
								</div>
								<div className="">
									<h1 className="font-semibold">
										{currencyLocaleFormat(budgetPlanned)}
									</h1>
									<span className="text-sm">
										Total Budget
									</span>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="pb-4 rounded-xl border-2">
					<div className="p-4 text-lg font-semibold text-center">
						Success Predictor
					</div>
					<div className="text-center items-center flex-1">
						<div>
							<div className="w-full min-h-60">
								<GaugeComponent
									value={parseFloat(
										`${Number(project?.SuccessPredictorPercent).toFixed(2)}`,
									)}
									type="radial"
									labels={successLabels}
									arc={arcSuccess}
									pointer={pointer}
								/>
							</div>
						</div>
						<div className="w-full  an-op">
							<div className="flex justify-center items-center">
								<div className="">
									<h1 className="font-semibold">
										{project?.SuccessPredictorPercent || 0}%
									</h1>
									<span className="text-sm">
										Success Predictor
									</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="flex justify-end  mr-3 my-4">
				<div
					className="flex items-center cursor-pointer"
					onClick={() => handleClick(project?.ProjectId)}
				>
					<div className="mr-3">Details</div>
					<div>
						{isOpen ? (
							<FaChevronUp className="cursor-pointer" />
						) : (
							<FaChevronDown className="cursor-pointer" />
						)}
					</div>
				</div>
			</div>
			<div>
				{isOpen && (
					<>
						<ProjectDetail projectId={project.ProjectId} />
					</>
				)}
			</div>
		</div>
	);
};

export default DashboardProject;
