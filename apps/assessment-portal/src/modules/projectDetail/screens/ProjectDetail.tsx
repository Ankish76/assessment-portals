"use client";
import { SetStateAction, useEffect, useMemo, useRef, useState } from "react";

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
import { useStore } from "@root/lib/zustand/store";
import FeedbackList from "../components/FeedbackList";
import { FaStarHalfAlt } from "react-icons/fa";
import { FaRegStar, FaStar } from "react-icons/fa6";
import Datepicker, { DateValueType } from "react-tailwindcss-datepicker";
import moment from "moment";

ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
);

const ProjectDetail = ({ projectId }: { projectId: string }) => {
	const dashboardProjectsRatings = useStore(m => m.dashboardProjectsRatings);
	const getDashboardProjectRatings = useStore(
		m => m.getDashboardProjectRatings,
	);
	const project = useMemo(() => {
		return dashboardProjectsRatings.find(
			pro => pro.ProjectId === projectId,
		);
	}, [dashboardProjectsRatings, projectId]);
	const ratings = Array.from(new Array(5), (x, i) => i + 1);

	const options = {
		responsive: true,
		plugins: {
			legend: {
				display: false,
				position: "top" as const,
			},
			title: {
				display: true,
				text: project?.ProjectName,
			},
		},
		layout: {
			autoPadding: true,
		},
		maintainAspectRatio: false,
	};
	const data = useMemo(() => {
		return {
			labels: project?.RatingByCategories.map(
				category => category.Category,
			),
			datasets: [
				{
					label: project?.ProjectName,
					data: project?.RatingByCategories.map(
						category => category.Rating,
					),
					backgroundColor: project?.RatingByCategories.map(r =>
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
	}, [project?.ProjectName, project?.RatingByCategories]);
	const endDate = moment(); // Get current date
	const startDate = moment().subtract(3, "months"); // Subtract 3 months

	const [value, setValue] = useState<DateValueType>({
		startDate: startDate.format("MM/DD/YYYY"),
		endDate: endDate.format("MM/DD/YYYY"),
	});
	useEffect(() => {
		getDashboardProjectRatings({
			projectId: projectId,
			DateRangeCondition: value
				? ([value.startDate, value.endDate] as string[])
				: null,
		});
	}, [value]);

	const handleValueChange = (newValue: DateValueType) => {
		if (
			newValue &&
			newValue?.endDate !== null &&
			newValue?.startDate !== null
		) {
			setValue({
				startDate: moment(newValue.startDate).format("MM/DD/YYYY"),
				endDate: moment(newValue.endDate).format("MM/DD/YYYY"),
			});
		} else setValue(null);
	};

	return (
		<div className="">
			<div className="m-5 border-2 bg-white rounded-lg p-5">
				<div className="flex justify-between">
					<div>
						<div className="text-base font-bold">
							{project?.ProjectName}
						</div>
						<div className="text-xs">{project?.ProjectDesc}</div>
					</div>
					<div className="w-80">
						<Datepicker
							separator={"To"}
							primaryColor={"indigo"}
							value={value}
							onChange={handleValueChange}
							showShortcuts={true}
						/>
					</div>
				</div>
				<div className="border-2 p-2 my-2 h-full">
					<div className="flex justify-between">
						<div>
							<span className="font-semibold">
								Success Predictability:{" "}
							</span>
							{project?.SuccessPredictorPercent || "00.00"}%
						</div>
						<div className="flex items-center">
							<span className="font-semibold mr-2">Rating:</span>
							{ratings.map((r, i) => (
								<button
									disabled
									key={`rating${i}`}
									className="text-onekey-100 pr-1"
								>
									{Number(project?.Rating)! >= r ? (
										<FaStar color="#ffca28" />
									) : Number(project?.Rating) < r &&
									  Number(project?.Rating) + 1 > r ? (
										<FaStarHalfAlt color="#ffca28" />
									) : (
										<FaRegStar color="#ffca28" />
									)}
								</button>
							))}{" "}
							{project?.Rating || "0.0"}
						</div>
					</div>
					<div></div>
					<div style={{ minHeight: "300px" }}>
						<Bar options={options} data={data} />
					</div>
				</div>
			</div>
			<FeedbackList dateValue={value} projectId={projectId} />
		</div>
	);
};

export default ProjectDetail;
