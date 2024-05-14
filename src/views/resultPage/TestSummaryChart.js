import {PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart} from "recharts";


const TestSummaryChart = ({testChartData}) => {

    return(
        <div className="total-hundred">
            <div className="total-title">핵심지표별 백분위수</div>
            {/* 6각형 그래프 */}
            <RadarChart className="total-hundred-chart" width={350} height={300} data={testChartData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" />
                <PolarRadiusAxis angle={0} domain={[0, 150]} />
                <Radar name="Mike" dataKey="latest" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} dot={{ stroke: '#8884d8', fill: '#8884d8', r: 3 }}/>
                <Radar name="Lily" dataKey="now" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
                {/*<Legend />*/}
            </RadarChart>
        </div>
    )
}

export default TestSummaryChart