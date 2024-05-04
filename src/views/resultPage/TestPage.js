import horiz from "../../assets/image/testPage/horiz.png"

import "../../assets/css/test.css"
import SideBar from "../mainPage/SideBar";
import React, {useEffect, useState} from "react";
import TimeGraphPage from "./TimeGraphPage";
import TimegraphPage from "./TimeGraphPage";

const TestPage = () => {
    const [userId, setUserId] = useState('');
    const [startD, setStartD] = useState('');
    const [endD, setEndD] = useState('');
    const [data, setData] = useState([{}])
    const [isDetail, setIsDetail] = useState(false)
    const [selectData, setSelectData] = useState()

    const handleSearchInputChange = (event) => {
        setUserId(event.target.value);
    };

    const handleDetailClick = (item) => {
        setIsDetail(true)
        setSelectData(item)
    }

    const handleSearchButtonClick = async () => {
        return new Promise((resolve, reject) =>{
            const data = selectBetweenData();
            resolve(data);
        })
    };

    const selectAllData = async () => {
        const token = localStorage.getItem('token')

            try {

                const response = await fetch('http://localhost:8080/user/summarytestall', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token
                    },
                    mode: 'cors'
                })
                return await response.json()
            } catch (error) {
                console.error('오류 발생:', error);
            }
    }

    const selectBetweenData = async () => {
        try {

            const startDate = startD.toString()
            const endDate = endD.toString()
            const response = await fetch('http://localhost:8080/user/betweentest', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({startDate, endDate, userId}),
                mode: 'cors',
            })
            return await response.json()
        } catch (error) {
            console.error('오류 발생:', error);
        }
    }

    const getTestAllData = () =>{
        return new Promise((resolve, reject) =>{
            const data = selectAllData();
            resolve(data);
        })
    }

    const initTask = async () => {
        const allData = await getTestAllData()
        setData(allData)
    }

    const runTask = async () => {
        const searchData = await handleSearchButtonClick()
        setData(searchData)
    }

    useEffect(() => {
        initTask()
    }, []);

    /*useEffect(() => {
        if(selectUser !== ""){
            runTask()
        }

    }, [selectUser])*/

    const tableRows = data.map((item, index) => (
        <tr key={index}>
            <td>{item.date}</td>
            <td>{item.userId}</td>
            <td>{item.accurate}</td>
            <td>{item.fixCount}</td>
            <td>{item.questionTime}</td>
            <td>{item.regression}</td>
            <td>{item.saccade}</td>
            <td>{item.totalReadTime}</td>
            <td>
                <div className="test-detail">
                    <button onClick={() => handleDetailClick(item)}>자세히 보기</button>
                </div>
            </td>
        </tr>
    ));


    return (
        <div>
            <SideBar/>
            {!isDetail && <div className="test-main">
                <div className="mypage-mypage">진단결과 > 목록</div>
                <div className="test-days">
                    <div className="test-options">
                        <div>
                            <input type="date" id="test-date" max="2024-12-31" min="2000-01-01" value={startD}
                                   onChange={(e) => setStartD(e.target.value)}/>
                            <img id="test-img" src={horiz} alt=""/>
                            <input type="date" id="test-date" max="2024-12-31" min="2000-01-01" value={endD}
                                   onChange={(e) => setEndD(e.target.value)}/>
                        </div>

                        <div className={"test-search-container"}>
                            <input type="text" id="test-search" value={userId} onChange={handleSearchInputChange}
                                   placeholder="아이디"/>
                            <button className="test-search-button" onClick={runTask}></button>
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
                            <th>날짜</th>
                            <th>이름</th>
                            <th>정확도</th>
                            <th>고정횟수</th>
                            <th>풀이시간</th>
                            <th>회귀</th>
                            <th>도약</th>
                            <th>총시간</th>
                            <th>시계열 그래프</th>
                        </tr>
                        </thead>
                        <tbody>{tableRows}</tbody>
                    </table>
                </div>
            </div>}
            {isDetail && <TimegraphPage selectData={selectData}/>}
        </div>

    )
}

export default TestPage