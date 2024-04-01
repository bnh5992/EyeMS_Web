import React, {useEffect, useState} from 'react';
import {Client} from "@stomp/stompjs";
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';
import ScrollMenu from 'react-horizontal-scrolling-menu';

const Socket = () => {

    const [message, setMessage] = useState([{
        x : 0,
        y : 0,
    }])
    useEffect(() => {

        const client = new Client({
            brokerURL: "ws://localhost:8080/ws", // 서버 WebSocket URL
            reconnectDelay: 5000,
            onConnect: () => {
                client.subscribe(`/sub/chat/rooms/` + localStorage.getItem("roomId"), (message) => {
                    const msg = JSON.parse(message.body);
                    setMessage((prevMessage) => [...prevMessage, msg]);
                });
            },
        });
        client.activate();
    }, []);

    return (

        <div>
            <LineChart width={1000} height={400} data={message}>
                <CartesianGrid strokeDasharray="3 3"/>
                <XAxis dataKey="name"/>
                <YAxis/>
                <Tooltip/>
                <Legend/>
                <Line type="monotone" dataKey="x" stroke="#8884d8"/>
                <Line type="monotone" dataKey="y" stroke="#82ca9d"/>
            </LineChart>
        </div>

    );
}

export default Socket