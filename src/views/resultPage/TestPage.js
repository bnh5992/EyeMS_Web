import horiz from "../../assets/image/testPage/horiz.png"
import {Modal} from "reactstrap";
import question from "../../assets/image/testPage/question.png";
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
            <td>{item.saccade}</td>
            <td>{item.regression}</td>
            <td>{item.totalReadTime}</td>
            <td>{item.questionTime}</td>
            <td>
                <div className="test-detail">
                    <button onClick={() => handleDetailClick(item)}>자세히 보기</button>
                </div>
            </td>
        </tr>
    ));


    const [isModalOpen1, setIsModalOpen1] = useState(false);
    const [isModalOpen2, setIsModalOpen2] = useState(false);
    const [isModalOpen3, setIsModalOpen3] = useState(false);
    const [isModalOpen4, setIsModalOpen4] = useState(false);
    const [isModalOpen5, setIsModalOpen5] = useState(false);
    const [isModalOpen6, setIsModalOpen6] = useState(false);

    const openModal1 = () => {
        setIsModalOpen1(true);
    };

    const closeModal1 = () => {
        setIsModalOpen1(false);
    };

    const openModal2 = () => {
        setIsModalOpen2(true);
    };

    const closeModal2 = () => {
        setIsModalOpen2(false);
    };

    const openModal3 = () => {
        setIsModalOpen3(true);
    };

    const closeModal3 = () => {
        setIsModalOpen3(false);
    };

    const openModal4 = () => {
        setIsModalOpen4(true);
    };

    const closeModal4 = () => {
        setIsModalOpen4(false);
    };

    const openModal5 = () => {
        setIsModalOpen5(true);
    };

    const closeModal5 = () => {
        setIsModalOpen5(false);
    };

    const openModal6 = () => {
        setIsModalOpen6(true);
    };

    const closeModal6 = () => {
        setIsModalOpen6(false);
    };

    return (
        <div>
            <SideBar/>
            {!isDetail && <div className="test-main">
                <div className="mypage-mypage">진단 결과 > 목록</div>
                <div className="test-days2">
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

                    <Modal
                        className="modal-question1"
                        isOpen={isModalOpen1}
                        onRequestClose={closeModal1}>
                        <div className="modal-triangle"></div>
                        <div className="modal-main">
                            <p>푼 문제들 중 정답 문제에 대한 비율을 나타냅니다.</p>
                            <p>(정답/총 문제 * 100%)</p>
                        </div>
                    </Modal>

                    <Modal
                        className="modal-question2"
                        isOpen={isModalOpen2}
                        onRequestClose={closeModal2}>
                        <div className="modal-triangle"></div>
                        <div className="modal-main">
                            <p>글을 읽는 동안 발생한 고정에 대한 비율을 나타냅니다.</p>
                            <p>(고정 시간/전체 시간 * 100%)</p>
                        </div>
                    </Modal>

                    <Modal
                        className="modal-question3"
                        isOpen={isModalOpen3}
                        onRequestClose={closeModal3}>
                        <div className="modal-triangle"></div>
                        <div className="modal-main">
                            <p>글을 읽는 동안 발생한 도약에 대한 비율을 나타냅니다.</p>
                            <p>(도약 시간/전체 시간 * 100%)</p>
                        </div>
                    </Modal>

                    <Modal
                        className="modal-question4"
                        isOpen={isModalOpen4}
                        onRequestClose={closeModal4}>
                        <div className="modal-triangle"></div>
                        <div className="modal-main">
                            <p>글을 읽는 동안 발생한 도약 중 회귀에 대한 비율을 나타냅니다.</p>
                            <p>(회귀 시간/도약 시간 * 100%)</p>
                        </div>
                    </Modal>

                    <Modal
                        className="modal-question5"
                        isOpen={isModalOpen5}
                        onRequestClose={closeModal5}>
                        <div className="modal-triangle"></div>
                        <div className="modal-main">
                            <p>진단을 진행하는 동안 소요된 문제 풀이 시간 비율을 나타냅니다.</p>
                            <p>(문제 풀이 시간/전체 시간 * 100%)</p>
                        </div>
                    </Modal>

                    <Modal
                        className="modal-question6"
                        isOpen={isModalOpen6}
                        onRequestClose={closeModal6}>
                        <div className="modal-triangle"></div>
                        <div className="modal-main">
                            <p>진단을 진행하는 동안 소요된 글 읽은 시간 비율을 나타냅니다.</p>
                            <p>(읽은 시간/전체 시간 * 100%)</p>
                        </div>
                    </Modal>


                    <table className="test-table">
                        <colgroup>
                            <col/>
                            <col/>
                            <col/>
                            <col/>
                        </colgroup>
                        <thead>
                        <tr id="bg">
                            <th id = "bg1">날짜</th>
                            <th id = "bg2">이름</th>
                            <th id = "bg3">정답률<img src={question}
                                        onMouseEnter={openModal1}
                                        onMouseLeave={closeModal1}/></th>
                            <th id = "bg4">고정 비율<img src={question}
                                         onMouseEnter={openModal2}
                                         onMouseLeave={closeModal2}/></th>
                            <th id = "bg5">도약 비율<img src={question}
                                       onMouseEnter={openModal3}
                                       onMouseLeave={closeModal3}/></th>
                            <th id = "bg6">회귀 비율<img src={question}
                                       onMouseEnter={openModal4}
                                       onMouseLeave={closeModal4}/></th>
                            <th id = "bg7">읽은 시간 비율<img src={question}
                                        onMouseEnter={openModal5}
                                        onMouseLeave={closeModal5}/></th>
                            <th id = "bg8">풀이 시간 비율<img src={question}
                                         onMouseEnter={openModal6}
                                         onMouseLeave={closeModal6}/></th>
                            <th id = "bg9">시계열 그래프</th>
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