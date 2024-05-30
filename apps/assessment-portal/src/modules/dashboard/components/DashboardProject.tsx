import { useMemo } from "react";
import { DashboardProject as DashboardProjectType } from "../interfaces";

import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { generateColor } from "@root/helpers/generateColor";

ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
);

const DashboardProject = ({ project }: { project: DashboardProjectType }) => {
	const options = {
		responsive: true,
		plugins: {
			legend: {
				display: false,
				position: "top" as const,
			},
			title: {
				display: true,
				text: project.ProjectName,
			},
		},
		layout: {
			autoPadding: true,
		},
		maintainAspectRatio: false,
	};
	const data = useMemo(() => {
		return {
			labels: project.RatingByCategories.map(
				category => category.Category,
			),
			datasets: [
				{
					label: project.ProjectName,
					data: project.RatingByCategories.map(
						category => category.Rating,
					),
					backgroundColor: project.RatingByCategories.map(r =>
						r.Rating
							? r.Rating >= 3.5
								? "#90EE90"
								: r.Rating > 2.5
									? "#FAFA33"
									: "#FF5733"
							: "#FF5733",
					),
					borderColor: "orange",
					borderWidth: 1,
				},
			],
		};
	}, [project.ProjectName, project.RatingByCategories]);

	return (
		<div className="m-5 border-2 bg-white rounded-lg p-5">
			<div className="text-base font-bold">{project.ProjectName}</div>
			<div className="text-xs">{project.ProjectDesc}</div>
			<div className="border-2 p-2 my-2 h-full">
				<div className="flex justify-between">
					<div>
						Prediction Score to Success Predictability:{" "}
						{project.SuccessPredictorPercent || "00.00"}%
					</div>
					<div>Rating: {project.Rating || "0.0"}</div>
				</div>
				<div style={{ minHeight: "300px" }}>
					<Bar options={options} data={data} />
				</div>
			</div>
		</div>
	);
};

export default DashboardProject;
