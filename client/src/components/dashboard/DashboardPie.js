import React, { useEffect } from "react";

import { PieChart, Pie, Legend, Tooltip, ResponsiveContainer } from 'recharts';
import "./dashboard.css";

function DashboardPie() {
    ///piechart data
    const data01 = [
        { name: 'Easy', value: 100, fill: "#5cb85c" },
        { name: 'Medium', value: 200, fill: "#f0ad4e" },
        { name: 'Hard', value: 300, fill: "#d8091c" }
    ];

    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };
    return (
        <div className="card mb-3 cardPie">
            <div className="card-header text-center pieHeader" >
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
                        <div className="inline"><h3> <span className="badge easyIndicator">Easy </span></h3></div>
                        <div className="inline"><h3>  <span className="badge mediumIndicator">Medium </span></h3></div>
                        <div className="inline"><h3> <span className="badge hardIndicator">Hard</span></h3></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DashboardPie;