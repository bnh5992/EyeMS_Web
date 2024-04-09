import React, { useEffect, useState, useRef } from 'react';
import { Client } from "@stomp/stompjs";
import UserRealDetail from "./UserRealDetail";

const Socket = () => {

    const client = useRef(null);
    const [user, setUser] = useState([])
    const [selectedUser, setSelectedUser] = useState(null);
    const [showButtons, setShowButtons] = useState(true);

    useEffect(() => {
        client.current = new Client({
            brokerURL: "ws://localhost:8080/ws", // 서버 WebSocket URL
            reconnectDelay: 5000,
            onConnect: () => {
                console.log("connect")
                client.current.subscribe(`/sub/enter/chat/room/` + localStorage.getItem("roomId"), (message) => {
                    const msg = JSON.parse(message.body);
                    console.log(msg[0].message.list)
                    setUser(msg[0].message.list)
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
        if(showButtons){
            publishMessage()
        }
    }, [showButtons])

    const handleUserClick = (userName) => {
        setSelectedUser(userName);
        setUser(prevUsers => prevUsers.filter(user => user !== userName));
        setShowButtons(false)
    };

    return (
        <div>
            {showButtons && user.map((userName, index) => (
                <button key={index} onClick={() => handleUserClick(userName)}>{userName}</button>
            ))}
            {selectedUser && !showButtons && <UserRealDetail client={client} userName={selectedUser} showButton={setShowButtons}/>}
        </div>


    );
}

export default Socket;
