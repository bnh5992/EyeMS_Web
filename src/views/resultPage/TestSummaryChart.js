import {PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart} from "recharts";


const TestSummaryChart = () => {
    const data = [
        { subject: 'aaaaa', A: 120, B: 110 },
        { subject: 'bbbbb', A: 98, B: 130 },
        { subject: 'ccccc', A: 86, B: 100 },
        { subject: 'ddddd', A: 99, B: 85 },
        { subject: 'eeeeeeee', A: 85, B: 90 },
        { subject: 'fff', A: 95, B: 70 },
    ];
    return(
        <div className="total-hundred">
            <div className="total-title">핵심지표별 백분위수</div>
            {/* 6각형 그래프 */}
            <RadarChart className="total-hundred-chart" width={280} height={300} data={data}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" />
                <PolarRadiusAxis angle={0} domain={[0, 150]} />
                <Radar name="Mike" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} dot={{ stroke: '#8884d8', fill: '#8884d8', r: 3 }}/>
                <Radar name="Lily" dataKey="B" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
                {/*<Legend />*/}
            </RadarChart>
        </div>
    )
}

export default TestSummaryChart