import horiz from "../../assets/image/testPage/horiz.png"

import "../../assets/css/test.css"
import SideBar from "../mainPage/SideBar";
import React, {useEffect, useState} from "react";

const ContentPage = () => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const[contentData, setContentData] = useState([{}])
    const[contentName, setContentName] = useState('')
    useEffect(() => {
        userContentAllInfo()
        setContentName('Content1')
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
        const selectBox = document.querySelector('#contents-select');

        selectBox.addEventListener('change', () => {
            const value = selectBox.options[selectBox.selectedIndex].value;
            setContentName(value)
        });
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
                    {/*오빠가 해야할 일은 여기서 날짜 선택 범위(기간이니까 뒤에 선택 한 게 더 빠르면 안 됨)랑 날짜 선택시 value 변경*/}
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
                                <option value="Content1" >콘텐츠 1</option>
                                <option value="Content2" >콘텐츠 2</option>
                                <option value="Content3" >콘텐츠 3</option>
                                <option value="Content4" >콘텐츠 4</option>
                                <option value="Content5" >콘텐츠 5</option>
                                <option value="Content6" >콘텐츠 6</option>
                            </select>
                            <button className="test-search-button" onClick={selectBetweenData}></button>
                        </div>
                    </div>

                    {/*오빠가 해야할 일은 여기서 데이터 개수만큼 차트 만들기. (반복문으로 해야것지...?)*/}
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
                            <th class="test-content">컨텐츠 이름</th>
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