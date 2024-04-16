

import {
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    Radar,
    Legend,

    BarChart,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    Bar

} from 'recharts';


import "../../assets/css/result.css"
import React from "react";
import SideBar from "../mainPage/SideBar";

const ResultPage = () => {

    const data = [
        { subject: 'aaaaa', A: 120, B: 110 },
        { subject: 'bbbbb', A: 98, B: 130 },
        { subject: 'ccccc', A: 86, B: 100 },
        { subject: 'ddddd', A: 99, B: 85 },
        { subject: 'eeeeeeee', A: 85, B: 90 },
        { subject: 'fff', A: 95, B: 70 },
    ];


    return (
        <div>
            <SideBar/>
            {/* main */}
            <div className="total-main">
                <div className="mypage-mypage">종합 결과</div>
                <div className="total-top">
                    <div className="total-count">
                        <div className="total-title">진행 횟수</div>
                        <div className="total-count-detail">
                            <h3>진단횟수</h3>
                            <p>3회</p>
                        </div>
                        <hr/>
                        <div className="total-count-detail">
                            <h3>컨텐츠1</h3>
                            <p>14회</p>
                        </div>
                        <hr/>
                        <div className="total-count-detail">
                            <h3>컨텐츠2</h3>
                            <p>53회</p>
                        </div>
                        <hr/>
                        <div className="total-count-detail">
                            <h3>컨텐츠3</h3>
                            <p>64회</p>
                        </div>
                        <hr/>
                        <div className="total-count-detail">
                            <h3>컨텐츠4</h3>
                            <p>23회</p>
                        </div>
                        <hr/>
                        <div className="total-count-detail">
                            <h3>컨텐츠5</h3>
                            <p>84회</p>
                        </div>
                    </div>


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


                    <div className="total-sumup">
                        <div className="total-title">진단결과 요약</div>
                        {/*<div className="info2">
                            <p>진단 결과, 상위 24%로 <b>우수</b> 상태입니다.</p>
                        </div>*/}
                        <BarChart className="total-sumup-chart" width={280} height={260} data={data} layout="vertical">
                            <CartesianGrid strokeDasharray="3 3" />
                            <YAxis dataKey="subject" type="category" />
                            <XAxis dataKey="A" type="number" />
                            <Tooltip />
                            <Bar className="total-sumup-bar" dataKey="A" fill="#98A7FA" radius={[0, 30, 30, 0]}/>
                            {/*<Legend />*/}
                        </BarChart>

                    </div>
                </div>


                <div className="total-bottom">
                    <div className="total-contents">
                        <div className="total-container">
                            <div className="total-title">콘텐츠 수행</div>
                            <div className="total-options">
                                <select name="drop1" id="total-drop">
                                    <option value="">콘텐츠 1</option>
                                    <option value="">콘텐츠 2</option>
                                    <option value="">콘텐츠 3</option>
                                </select>
                            </div>
                        </div>
                        <table className="total-table">
                            <colgroup>
                                <col/>
                                <col/>
                                <col/>
                                <col/>
                            </colgroup>
                            <thead>
                            <tr>
                                <th>날짜</th>
                                <th>점수</th>
                                <th>진행률</th>
                                <th>횟수</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>2024-03-28</td>
                                <td>34점</td>
                                <td>67%</td>
                                <td>3회</td>
                            </tr>
                            <tr>
                                <td>2024-03-28</td>
                                <td>34점</td>
                                <td>67%</td>
                                <td>3회</td>
                            </tr>
                            <tr>
                                <td>2024-03-28</td>
                                <td>34점</td>
                                <td>67%</td>
                                <td>3회</td>
                            </tr>
                            <tr>
                                <td>2024-03-28</td>
                                <td>34점</td>
                                <td>67%</td>
                                <td>3회</td>
                            </tr>
                            <tr>
                                <td>2024-03-28</td>
                                <td>34점</td>
                                <td>67%</td>
                                <td>3회</td>
                            </tr>
                            </tbody>
                        </table>
                        <div className="total-detail">
                            <a href="http://localhost:3000">더보기</a>
                        </div>
                    </div>
                    <div className="days">
                        <div className="total-container">
                            <div className="total-title">콘텐츠 수행</div>
                            <div className="total-options">
                                <select name="drop1" id="total-drop">
                                    <option value="">콘텐츠 1</option>
                                    <option value="">콘텐츠 2</option>
                                    <option value="">콘텐츠 3</option>
                                </select>
                            </div>
                        </div>
                        <table className="total-table">
                            <colgroup>
                                <col/>
                                <col/>
                                <col/>
                                <col/>
                            </colgroup>
                            <thead>
                            <tr>
                                <th>날짜</th>
                                <th>점수</th>
                                <th>진행률</th>
                                <th>횟수</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>2024-03-28</td>
                                <td>34점</td>
                                <td>67%</td>
                                <td>3회</td>
                            </tr>
                            <tr>
                                <td>2024-03-28</td>
                                <td>34점</td>
                                <td>67%</td>
                                <td>3회</td>
                            </tr>
                            <tr>
                                <td>2024-03-28</td>
                                <td>34점</td>
                                <td>67%</td>
                                <td>3회</td>
                            </tr>
                            <tr>
                                <td>2024-03-28</td>
                                <td>34점</td>
                                <td>67%</td>
                                <td>3회</td>
                            </tr>
                            <tr>
                                <td>2024-03-28</td>
                                <td>34점</td>
                                <td>67%</td>
                                <td>3회</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>


            </div>
        </div>

    )
}

export default ResultPage