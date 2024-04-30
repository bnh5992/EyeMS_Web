import person from "../../assets/image/login/person.png"

import "../../assets/css/monitoring.css"
import SideBar from "../mainPage/SideBar";
import React, {useEffect, useRef, useState} from "react";
import {Client} from "@stomp/stompjs";


const UserOnlineList = ({setShowButton, setSelectedUser, client}) => {
    const [data, setData] = useState([
        ['데이터1', '데이터2', '데이터3', '데이터4'],
        ['데이터5', '데이터6', '데이터7', '데이터8'],
    ]);
    const [user, setUser] = useState([[]])

    useEffect(() => {
        client.current = new Client({
            brokerURL: "ws://localhost:8080/ws", // 서버 WebSocket URL
            reconnectDelay: 5000,
            onConnect: () => {
                console.log("connect")
                client.current.subscribe(`/sub/enter/chat/room/` + localStorage.getItem("roomId"), (message) => {
                    const msg = JSON.parse(message.body);
                    const chunk = chunkArray(msg[0].message.list, 4)
                    setUser(chunk)
                });
                handleConnectionChange();
            },
        });

        client.current.activate();

    }, []);
    const handleConnectionChange = () => {
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

    useEffect(() => {
        publishMessage()
    }, [])

    const chunkArray = (array, chunkSize) => {
        const chunkedArray = [];
        for (let i = 0; i < array.length; i += chunkSize) {
            chunkedArray.push(array.slice(i, i + chunkSize));
        }
        return chunkedArray;
    }
    const handleUserClick = (userName) => {
        console.log(userName)
        setSelectedUser(userName);
        setUser(prevUsers => prevUsers.filter(user => user !== userName));
        setShowButton(true)
    };

    useEffect(() => {
        runTask()
    }, [user]);

    const getpadRow = () =>{
        return new Promise((resolve, reject) =>{
            const data = padRows(user);
            resolve(data)
        })
    }

    const runTask = async () => {
        const padData = await getpadRow(user)
        setData(padData)
    }

    const padRows = async (data) => {
        const paddedData = [];
        for (let row of data) {
            const remainder = row.length % 4;
            if (remainder !== 0) {
                // 부족한 셀을 빈 셀로 채움
                const padding = new Array(4 - remainder).fill('');
                row = [...row, ...padding];
            }
            paddedData.push(row);
        }
        return paddedData;
    };

    return (
            <div className="test-main">
                <div className="mypage-mypage">실시간 모니터링 > 목록</div>
                <div className="monitoring-list">
                    {data.map((row, rowIndex) => (
                        <div key={rowIndex} className="monitoring-row">
                            {row.map((item, colIndex) => (
                                <div  onClick={() => handleUserClick(item)} key={colIndex} className={`monitoring-cell ${item ? '' : 'monitoring-empty'}`}>
                                    <img src={person}/>
                                    {item}
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
    );
}

export default UserOnlineList