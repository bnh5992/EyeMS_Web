
import React from "react";
import text from "../../assets/image/checkImage/temp2.png";
import SideBar from "../mainPage/SideBar";


import "../../assets/css/test.css"

const TimegraphPage = () => {

    return (
        <div className="time-body">
            <SideBar/>

            <div className="test-main">
                <div className="mypage-mypage">진단결과 > 시계열 그래프</div>
                <div className="test-days">
                    <div>
                        <div className="time-date">00월 00일 검사</div>
                        <img id="time-text-img" src={text}/>

                        <div className="time-button-box">
                            <sapn className="time-button">
                                <button >1</button>
                                <button >2</button>
                                <button >3</button>
                            </sapn>
                        </div>
                    </div>
                </div>
            </div>
            <div className="time-info">
                <div className="time-info-top">검사 결과 요약</div>

                <div className="time-info-main">
                    <table className="time-info-table">
                        <tbody>
                        <tr>
                            <td className="time-info-title">소요시간</td>
                            <td className="time-info-data">34분</td>
                        </tr>

                        <tr>
                            <td className="time-info-title">고정</td>
                            <td className="time-info-data">34회</td>
                        </tr>

                        <tr>
                            <td className="time-info-title">도약</td>
                            <td className="time-info-data">34회</td>
                        </tr>

                        <tr>
                            <td className="time-info-title">회귀</td>
                            <td className="time-info-data">34회</td>
                        </tr>
                        </tbody>
                    </table>

                </div>
            </div>
        </div>

    )
}

export default TimegraphPage