import {PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart} from "recharts";


const TestSummaryChart = ({testChartData}) => {
    const data = [
        { subject: '정확도', latest: 120, now: 110 },
        { subject: '고정횟수', latest: 98, now: 130 },
        { subject: '풀이시간', latest: 86, now: 100 },
        { subject: '회귀', latest: 99, now: 85 },
        { subject: '도약', latest: 85, now: 90 },
        { subject: '총시간', latest: 95, now: 70 },
    ];
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