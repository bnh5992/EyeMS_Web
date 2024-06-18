import horiz from "../../assets/image/testPage/horiz.png"

import "../../assets/css/test.css"
import SideBar from "../mainPage/SideBar";
import React, {useEffect, useState} from "react";

const ContentPage = () => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const[contentData, setContentData] = useState([{}])
    const[contentName, setContentName] = useState('All')
    useEffect(() => {
        const selectBox = document.querySelector('#contents-select');

        selectBox.addEventListener('change', () => {
            const value = selectBox.options[selectBox.selectedIndex].value;
            setContentName(value)
        });
        userContentAllInfo()
    }, []);



    const userContentAllInfo = async () => {
        const token = localStorage.getItem('token')
        try {
            const response = await fetch("http://localhost:8080/user/summarycontentall", {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
                mode: 'cors'
            });
            if (response.ok) {
                response.json().then(data => {
                    setContentData(data)

                }).catch(error => {
                    console.error('JSON 파싱 오류:', error);
                });
            } else {
                console.error('로그인 실패');
            }
        } catch (error) {
            console.error("데이터를 가져오는 중 오류 발생:", error);
        }
    };

    const selectBetweenData = async () => {
        const agencyId = localStorage.getItem("agencyId")
        console.log(contentName)
        if(contentName === 'All'){
            userContentAllInfo()
            return
        }
        try {
            const response = await fetch('http://localhost:8080/user/betweencontent', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({startDate, endDate, contentName, agencyId}),
                mode: 'cors',
            })
            if (response.ok) {
                response.json().then(data => {
                    console.log(data)
                    setContentData(data)

                }).catch(error => {
                    console.error('JSON 파싱 오류:', error);
                });
            } else {
                console.error('실패');
            }
        } catch (error) {
            console.error('오류 발생:', error);
        }
    }

    return (
        <div>
            <SideBar/>
            <div class="test-main">
                <div className="mypage-mypage">콘텐츠 결과 > 목록</div>
                <div class="test-days">

                    <div class="test-options">
                        <div>
                            <input type="date" id="test-date" max="2024-12-31" min="2000-01-01" value={startDate}
                                   onChange={(e) => setStartDate(e.target.value)}/>
                            <img id="test-img" src={horiz} alt="" />
                            <input type="date" id="test-date" max="2024-12-31" min="2000-01-01" value={endDate}
                                   onChange={(e) => setEndDate(e.target.value)}/>
                        </div>

                        <div className={"test-search-container"}>

                            <select name="drop1" id="contents-select">
                                <option value="All" >전체</option>
                                <option value="글자기억하기" >글자 기억하기</option>
                                <option value="과일색맞추기" >과일색 맞추기</option>
                                <option value="토끼를찾아라" >토끼를 찾아라</option>
                                <option value="동물찾기" >동물 찾기</option>
                                <option value="물고기사냥" >물고기 사냥</option>
                                <option value="돌고래의모험" >돌고래의 모험</option>
                            </select>
                            <button className="test-search-button" onClick={selectBetweenData}></button>
                        </div>
                    </div>

                    <table className="test-table">
                        <colgroup>
                            <col/>
                            <col/>
                            <col/>
                            <col/>
                        </colgroup>
                        <thead>
                        <tr id="bg">
                            <th class="test-date">날짜</th>
                            <th class="test-user">유저</th>
                            <th class="test-content">콘텐츠 이름</th>
                            <th class="test-score">점수</th>
                        </tr>
                        </thead>
                        <tbody>{contentData.map((data) => (
                                <tr>
                                    <td>{data.date}</td>
                                    <td>{data.userId}</td>
                                    <td>{data.contentName}</td>
                                    <td>{data.score}</td>
                                </tr>
                            ))
                        }

                        </tbody>
                    </table>
                </div>
            </div>
        </div>

    )
}

export default ContentPage