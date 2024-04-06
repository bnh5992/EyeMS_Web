import React, {useEffect, useRef, useState} from "react";
import logo from "../../assets/image/logo.png";
import {CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis} from "recharts";

const UserRealDetail = ({client, userName}) => {

    const [message, setMessage] = useState([
        {
            x : 0,
            y : 0
        }
    ])

    const canvasRef = useRef(null);
    const [count, setCount] = useState(0);
    const [showChart, setShowChart] = useState(false);
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');

        // 이미지 불러오기
        const img = new Image();
        img.onload = () => {
            // 캔버스 크기 설정
            canvas.width = 1920;
            canvas.height = 3240;

            // 이미지 그리기
            ctx.drawImage(img, 0, 0);
            const rect = canvas.getBoundingClientRect();
            const canvasX = rect.left;
            const canvasY = rect.top;
            // 마커 그리기
            ctx.fillStyle = 'red';
            ctx.beginPath();
            //const imageX = message[count].x - canvasX;
            //const imageY = message[count].y - canvasY;
            message.forEach((point) => {
                ctx.beginPath();
                ctx.arc(point.x, point.y, 5, 0, Math.PI * 2);
                ctx.fill();
            });
            setCount(count + 1)
        };
        img.src = logo;
    }, [message, canvasRef]);
    useEffect(() => {
        if(!client.current.connected){
            client.current.activate()
        }

        client.current.subscribe(`/sub/chat/room/` + localStorage.getItem("roomId") + "/" + userName, (message) => {

            const msg = JSON.parse(message.body);
            if(msg.length > 2){
                setMessage(prevMessage => {
                    const updatedMessage = msg.map(item => ({ x: item.message.x, y: item.message.y }));
                    console.log(updatedMessage)
                    return updatedMessage;
                });
                return
            }
            const x = msg[0].message.x;
            const y = msg[0].message.y;
            const canvas = canvasRef.current;
            const rect = canvas.getBoundingClientRect();
            const newX = x - rect.left;
            const newY = y - rect.top;
            setMessage(prevMessage => {
                const updatedMessage = [...prevMessage, { x: x, y: y }];
                return updatedMessage;
            });
        });

        client.current.publish({
            destination: "/pub/chat/message",
            body: JSON.stringify({
                type: "TALK",
                roomId: localStorage.getItem("roomId"),
                sender: userName,
                message: {
                    x: 1,
                    y: 1,
                },
                people: 1,
            }),
        });

    }, [])
    const handleButtonClick = () => {
        setShowChart(!showChart); // Toggle chart visibility
    };

return(
    <div>
        <canvas ref={canvasRef} />
        <button onClick={handleButtonClick}>Show Chart</button>
        {showChart && (
            <LineChart width={800} height={400} data={message}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="timestamp" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="x" stroke="#8884d8" />
                <Line type="monotone" dataKey="y" stroke="#8884d8" />
            </LineChart>
        )}
    </div>
)

}

export default UserRealDetail