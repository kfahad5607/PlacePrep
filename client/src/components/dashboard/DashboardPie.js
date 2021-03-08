import React from "react";
import { PieChart, Pie, Tooltip, ResponsiveContainer } from "recharts";

const DashboardPie = (props) => {
	const { easy, medium, hard } = props.submissions;
	///piechart data
	const data01 = [
		{ name: "Easy", value: easy, fill: "#5cb85c" },
		{ name: "Medium", value: medium, fill: "#f0ad4e" },
		{ name: "Hard", value: hard, fill: "#d9534f" },
	
	];

	const RADIAN = Math.PI / 180;
	const renderCustomizedLabel = ({
		cx,
		cy,
		midAngle,
		innerRadius,
		outerRadius,
		percent,
		index,
	}) => {
		const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
		const x = cx + radius * Math.cos(-midAngle * RADIAN);
		const y = cy + radius * Math.sin(-midAngle * RADIAN);

		return (
			<text
				x={x}
				y={y}
				fill="white"
				textAnchor={x > cx ? "start" : "end"}
				dominantBaseline="central"
			>
				{percent !== 0 ? `${(percent * 100).toFixed(0)}%` : ""}
			</text>
		);
	};

	return (
		<div className="card mb-3 cardPie">
			<div className="card-header text-center pieHeader">
				<h6 className="text-white mb-0">Your Coding Analytics</h6>
			</div>
			<div className="card-body">
				<div className="row">
					<div className="col-md-4">
						<ResponsiveContainer width="100%" height={210}>
							<PieChart width={350} height={200}>
								<Pie
									dataKey="value"
									isAnimationActive={false}
									data={data01}
									cx="50%"
									cy="55%"
									outerRadius={80}
									label={renderCustomizedLabel}
									labelLine={false}
								/>
								<Tooltip />
							</PieChart>
						</ResponsiveContainer>
					</div>
					<div className="col-md-8 inlineParent text-center ">
						{data01.map((data, index) => (
							<div key={index} className="inline">
								<h3>
									<span
										className="badge indicator text-white"
										style={{
											backgroundColor: `${data.fill}`,
											width: "150px",
										}}
									>
										{data.name} ({data.value})
									</span>
								</h3>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default DashboardPie;