import logo from "../../assets/image/myPage/logo.png"
import all from "../../assets/image/myPage/all.png"
import chart from "../../assets/image/myPage/chart.png"
import myPageBlue from "../../assets/image/myPage/mypageblue.png"
import live from "../../assets/image/myPage/live.png"
import person from "../../assets/image/myPage/person.png"
import "../../assets/css/mypage.css"
import React from "react";
import { useNavigate } from 'react-router-dom';


const SideBar = () => {
    const navigate = useNavigate();
    const handleNavigateSummary = () => {
        navigate("/summary")
    }

    const handleNavigateResult = () => {
        navigate("/result")
    }

    const handleNavigateMyPage = () => {
        navigate("/mypage")
    }

    const handleNavigateMonitoring = () => {
        navigate("/socket")
    }

    return(
    <div className="mypage-sidemenu">
        <div id="mypage-logo">
            <img src={logo}/>
        </div>
        <div className="mypage-menu">
            <button id="mypage-menuList" onClick={handleNavigateResult}><img src={chart} alt="" />종합 결과</button>
            <button id="mypage-menuList" onClick={handleNavigateSummary}><img src={all} alt="" />진단 결과</button>
            <button id="mypage-menuList" onClick={handleNavigateMonitoring}><img src={live} alt="" />실시간 모니터링</button>
            <button id="mypage-menuList" onClick={handleNavigateMyPage}><img src={myPageBlue} alt="" />마이페이지</button>
        </div>
        <div className="mypage-account">
            <img src={person} width="40px" height="40px" />
            <div>
                <h2>관리자</h2>
                <p>{localStorage.getItem("agencyId")}</p>
            </div>
        </div>
    </div>
    )
}

export default SideBar