import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const LineSummary = ({contentChartData}) => {

    return (
        <div className="total-sumup">
            <div className="total-title">개선결과 요약</div>
            {/*<div className="info2">
                            <p>진단 결과, 상위 24%로 <b>우수</b> 상태입니다.</p>
                        </div>*/}
            <LineChart
                width={600}
                height={300}
                data={contentChartData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="latest" stroke="#8884d8" />
                <Line type="monotone" dataKey="now" stroke="#82ca9d" />
            </LineChart>

        </div>
    )
}

export default LineSummary