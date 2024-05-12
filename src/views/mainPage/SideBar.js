import logo from "../../assets/image/myPage/logo.png"
import all from "../../assets/image/myPage/all.png"
import chart from "../../assets/image/myPage/chart.png"
import myPageBlue from "../../assets/image/myPage/mypage.png"
import live from "../../assets/image/myPage/live.png"
import person from "../../assets/image/myPage/person.png"
import person2 from "../../assets/image/myPage/whiteperson.png"
import "../../assets/css/mypage.css"
import React from "react";
import { useNavigate } from 'react-router-dom';


const SideBar = () => {
    const navigate = useNavigate();
    const handleNavigateTest = () => {
        navigate("/test")
    }

    const handleNavigateResult = () => {
        navigate("/result")
    }

    const handleNavigateMyPage = () => {
        navigate("/mypage")
    }

    const handleNavigateMonitoring = () => {
        navigate("/monitoring")
    }

    const handleNavigateManage = () => {
        navigate("/manage")
    }

    const handleLogout = () => {
        localStorage.clear()
        navigate("/")
    }

    return(
    <div className="mypage-sidemenu">
        <div id="mypage-logo">
            <img src={logo}/>
        </div>
        <div className="mypage-menu">
            <button id="mypage-menuList" onClick={handleNavigateResult}><img src={chart} alt="" />종합 결과</button>
            <button id="mypage-menuList" onClick={handleNavigateTest}><img src={all} alt="" />진단 결과</button>
            <button id="mypage-menuList" onClick={handleNavigateMonitoring}><img src={live} alt="" />실시간 모니터링</button>
            <button id="mypage-menuList" onClick={handleNavigateManage}><img src={person2} alt="" />회원관리</button>
            <button id="mypage-menuList" onClick={handleNavigateMyPage}><img src={myPageBlue} alt="" />마이페이지</button>
        </div>
        <div className="mypage-account">
            <img src={person} width="40px" height="40px" />
            <div>
                <h2>{localStorage.getItem("agencyId")}</h2>
                <button id="logout-btn" onClick={handleLogout}>로그아웃</button>
            </div>
        </div>
    </div>
    )
}

export default SideBar