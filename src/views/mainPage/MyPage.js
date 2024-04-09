
import logo from "../../assets/image/myPage/logo.png"
import all from "../../assets/image/myPage/all.png"
import chart from "../../assets/image/myPage/chart.png"
import myPageBlue from "../../assets/image/myPage/mypageblue.png"
import live from "../../assets/image/myPage/live.png"
import person from "../../assets/image/myPage/person.png"
import chevron from "../../assets/image/myPage/chevron_right.png"
import "../../assets/css/mypage/mypage.css"
import React from "react";


const MyPage = () => {
    return (
        <div>
            {/* 사이드메뉴 */}
            <div className="sidemenu">
                <div id="logo">
                    <img src={logo}/>
                </div>
                <div className="menu">
                    <button id="menuList"><img src={all} alt="" />종합 결과</button>
                    <button id="menuList"><img src={chart} alt="" />진단 결과</button>
                    <button id="menuList"><img src={live} alt="" />실시간 모니터링</button>
                    <button id="menuList"><img src={myPageBlue} alt="" />마이페이지</button>
                </div>
                <div className="account">
                    <img src={person} width="40px" height="40px" />
                    <div>
                        <h2>보호자</h2>
                        <p>manage1234</p>
                    </div>
                </div>
            </div>
            {/* 오른쪽 콘텐츠 */}
            <div className="wrap">
                <div className="mypage">마이페이지 > 회원정보</div>
                <div className="contentBox">
                    <div className="profile">
                        <img src={person} width="40px" />
                        <div className="name">이수연(ID2342)</div>
                    </div>
                    <div className="innerBox2">
                        <div className="infomation2">
                            <div className="bold2">생년월일</div>
                            <div className="regular">2001-03-06</div>
                        </div>
                    </div>
                    <div className="innerBox3">
                        <div className="infomation2">
                            <div className="bold4">주소</div>
                            <div className="regular">
                                경기도 군포시 광정로 119 대림솔거아파트 736동 1104호 우 15825
                            </div>
                        </div>
                    </div>
                    <div className="innerBox3">
                        <div className="infomation2">
                            <div className="bold2">전화번호</div>
                            <div className="regular">010-7200-1794</div>
                        </div>
                    </div>
                    <div className="innerBox3">
                        <div className="infomation2">
                            <div className="bold">이메일</div>
                            <div className="regular">bird1794@naver.com</div>
                        </div>
                    </div>
                    <div className="innerBox4">
                        <div className="infomation2">
                            <div className="bold">가입일</div>
                            <div className="regular">2024-03-02</div>
                        </div>
                    </div>
                    <div className="btn">
                        <button>수정</button>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default MyPage