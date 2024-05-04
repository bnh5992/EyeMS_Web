
import "../../assets/css/result.css"
import React, {useEffect, useRef, useState} from "react";
import SideBar from "../mainPage/SideBar";
import {Client} from "@stomp/stompjs";
import UserCheck from "./UserCheck";
import ContentSummary from "./ContentSummary";
import ProgressContent from "./ProgressContent";
import LineSummary from "./LineSummary";
import TestSummaryChart from "./TestSummaryChart";
import TestSummary from "./TestSummary";

const ResultPage = () => {
    const lineData = [
        { name: 'content1', latest: 4000, now: 2400},
        { name: 'content2', latest: 3000, now: 1398},
        { name: 'content3', latest: 2000, now: 9800},
        { name: 'content4', latest: 2780, now: 3908},
        { name: 'content5', latest: 1890, now: 4800},
        { name: 'content6', latest: 2390, now: 3800},
    ];

    const polarData = [
        { subject: '정확도', latest: 120, now: 110 },
        { subject: '고정횟수', latest: 98, now: 130 },
        { subject: '풀이시간', latest: 86, now: 100 },
        { subject: '회귀', latest: 99, now: 85 },
        { subject: '도약', latest: 85, now: 90 },
        { subject: '총시간', latest: 95, now: 70 },
    ];

    const summaryTestData = [
        { date: '2024-03-28', accurate: '34점', fixCount: '67%', questionTime: '67%', regression: '67%', saccade: '67%', totalReadTime: '67%' },
        { date: '2024-03-28', accurate: '34점', fixCount: '67%', questionTime: '67%', regression: '67%', saccade: '67%', totalReadTime: '67%' },
        { date: '2024-03-28', accurate: '34점', fixCount: '67%', questionTime: '67%', regression: '67%', saccade: '67%', totalReadTime: '67%' },
        { date: '2024-03-28', accurate: '34점', fixCount: '67%', questionTime: '67%', regression: '67%', saccade: '67%', totalReadTime: '67%' },
        { date: '2024-03-28', accurate: '34점', fixCount: '67%', questionTime: '67%', regression: '67%', saccade: '67%', totalReadTime: '67%' }
    ];


    const client = useRef(null);
    const user = useRef([{name : null, online : false}])
    const [updateUser, setUpdateUser] = useState([{}])
    const [contentData, setContentData] = useState([{}])
    const [testData, setTestData] = useState([{}])
    const [contentCountData, setContentCountData] = useState([{}])
    const [contentChartData, setContentChartData] = useState([{}])
    const [testChartData, setTestChartData] = useState([{}])
    const [selectUser, setSelectUser] = useState("")

    const summary = async (name) => {
        if(name !=null){
            try {
                const response = await fetch('http://localhost:8080/user/summerycontent/'+name, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    mode: 'cors'
                })
                return await response.json()
            } catch (error) {
                console.error('오류 발생:', error);
            }
        }

    };

    const testSummary = async (name) => {
        if(name !=null){
            try {
                const response = await fetch('http://localhost:8080/user/summarytest/'+name, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    mode: 'cors'
                })
                return await response.json()
            } catch (error) {
                console.error('오류 발생:', error);
            }
        }

    };

    const userList = async () => {
        const token = localStorage.getItem('token')
        try {
            const response = await fetch('http://localhost:8080/user/userlist', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
                mode: 'cors'
            });
            return await response.json();

        } catch (error) {
            console.error('오류 발생:', error);
        }
    };

    const contentCountList = async (name) => {
        if(name !=null){
            try {
                const response = await fetch('http://localhost:8080/user/countcontent/'+name, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    mode: 'cors'
                })
                return await response.json()
            } catch (error) {
                console.error('오류 발생:', error);
            }
        }
    };

    const testChartSummary = async (name) => {
        if(name !=null){
            try {
                const response = await fetch('http://localhost:8080/user/latesttest/'+name, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    mode: 'cors'
                })
                return await response.json()
            } catch (error) {
                console.error('오류 발생:', error);
            }
        }
    };

    const contentSummaryChart = async (name) => {
        if(name !=null){
            try {
                const response = await fetch('http://localhost:8080/user/latestcontent/'+name, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    mode: 'cors'
                })
                return await response.json()
            } catch (error) {
                console.error('오류 발생:', error);
            }
        }
    }

    const getSummaryData = (name) =>{
        return new Promise((resolve, reject) =>{
            const data = summary(name);
            resolve(data);
        })
    }

    const getUserListData = () =>{
        return new Promise((resolve, reject) =>{
            const data = userList();
            resolve(data);
        })
    }

    const getSocket = () =>{
        return new Promise((resolve, reject) =>{
            const data = openSocket();
            resolve(data);
        })
    }

    const getContentCountData = (name) =>{
        return new Promise((resolve, reject) =>{
            const data = contentCountList(name);
            resolve(data);
        })
    }

    const getContentSummaryChartData = (name) =>{
        return new Promise((resolve, reject) =>{
            const data = contentSummaryChart(name);
            resolve(data);
        })
    }

    const getTestSummaryChartData = (name) =>{
        return new Promise((resolve, reject) =>{
            const data = testChartSummary(name);
            resolve(data);
        })
    }

    const getTestSummaryData = (name) =>{
        return new Promise((resolve, reject) =>{
            const data = testSummary(name);
            resolve(data);
        })
    }

    const initTask = async () => {
        const data = await getUserListData()
        const modifiedUsers = data["userList"].map(user => ({ name: user,  online : false}));
        user.current = modifiedUsers

        const socket = await getSocket()
        const summaryData = await getSummaryData(user.current[0].name)
        setContentData(summaryData)
        const countData = await getContentCountData(user.current[0].name)
        setContentCountData(countData)
        const contentChartData = await getContentSummaryChartData(user.current[0].name)
        const polChartData = await getTestSummaryChartData(user.current[0].name)
        for (let i = 0; i < lineData.length; i++) {
            lineData[i].latest = contentChartData.latest[i];
            lineData[i].now = contentChartData.now[i];
            polarData[i].latest = polChartData.latest[i];
            polarData[i].now = polChartData.now[i];
        }
        console.log(polarData)
        setContentChartData(lineData)
        setTestChartData(polarData)

        const testData = await getTestSummaryData(user.current[0].name)
        setTestData(testData)
    }

    const runTask = async () => {
        const summaryData = await getSummaryData(selectUser)
        setContentData(summaryData)
        const countData = await getContentCountData(selectUser)
        setContentCountData(countData)
        const contentChartData = await getContentSummaryChartData(selectUser)
        const polChartData = await getTestSummaryChartData(selectUser)
        for (let i = 0; i < lineData.length; i++) {
            lineData[i].latest = contentChartData.latest[i];
            lineData[i].now = contentChartData.now[i];
            polarData[i].latest = polChartData.latest[i];
            polarData[i].now = polChartData.now[i];
        }
        setContentChartData(lineData)
        setTestChartData(polarData)

        const testData = await getTestSummaryData(selectUser)
        setTestData(testData)


    }




    useEffect(() => {
        initTask()
    }, []);

    useEffect(() => {
        if(selectUser !== ""){
            runTask()
        }

    }, [selectUser])

    const openSocket = async () => {
        client.current = new Client({
            brokerURL: "ws://localhost:8080/ws", // 서버 WebSocket URL
            reconnectDelay: 5000,
            onConnect: () => {
                console.log("connect")
                client.current.subscribe(`/sub/enter/chat/room/` + localStorage.getItem("roomId"), (message) => {
                    const msg = JSON.parse(message.body);
                    const updateUser = user.current.map(userName => ({
                        name : userName.name,
                        online : msg[0].message.list.includes(userName.name)
                    }));
                    setUpdateUser(updateUser)
                    user.current = updateUser
                });

                handleConnectionChange();
            },
        });

        client.current.activate();
    }
    const handleConnectionChange = async () => {
        publishMessage();
    };
    const publishMessage = () => {
        if (client.current.connected) {
            console.log("publish");
            client.current.publish({
                destination: "/pub/chat/message",
                body: JSON.stringify({
                    type: "ENTER",
                    roomId: localStorage.getItem("roomId"),
                    sender: localStorage.getItem("agencyId"),
                    message: {
                        x: 1,
                        y: 1,
                    },
                    people: "PARENT",
                }),
            });
        }
    };


    return (
        <div>
            <SideBar/>
            {/* main */}
            <div className="total-main">
                <div className="total-top-bar">
                    <div className="mypage-mypage">종합 결과</div>
                    <UserCheck user={user} updateUser={updateUser} setSelectUser={setSelectUser}/>
                </div>
                <div className="total-top">
                    <ProgressContent contentCountData={contentCountData}/>

                    <TestSummaryChart testChartData={testChartData}/>

                    <LineSummary contentChartData={contentChartData}/>
                </div>

                <div className="total-bottom">
                    <TestSummary testData={testData}/>
                    <ContentSummary contentData={contentData}/>
                </div>

            </div>
        </div>

    )
}

export default ResultPage