import React, {useEffect, useRef, useState} from "react";
import temp1 from "../../assets/image/checkImage/temp1.png";
import temp2 from "../../assets/image/checkImage/temp2.png";
import temp3 from "../../assets/image/checkImage/temp3.png";
import {CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis} from "recharts";
import SideBar from "../mainPage/SideBar";

const UserRealDetail = ({client, userName, showButton}) => {

    const images = [temp1, temp2, temp3]
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [firstImage , setFirstImage] = useState([{}])
    const [secondImage , setSecondImage] = useState([{}])
    const [thirdImage , setThirdImage] = useState([{}])

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
            canvas.width = img.width/3;
            canvas.height = img.height/3;

            // 이미지 그리기
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            const rect = canvas.getBoundingClientRect();
            const canvasX = rect.left;
            const canvasY = rect.top;
            // 마커 그리기
            ctx.fillStyle = 'red';
            ctx.beginPath();
            //const imageX = message[count].x - canvasX;
            //const imageY = message[count].y - canvasY;
            switch (currentImageIndex) {
                case 0:
                    firstImage.forEach((point) => {
                        ctx.beginPath();
                        ctx.arc(point.x/3, point.y/3, 1, 0, Math.PI * 2);
                        ctx.fill();
                    });
                    break;
                case 1:
                    secondImage.forEach((point) => {
                        ctx.beginPath();
                        ctx.arc(point.x/3, point.y/3, 1, 0, Math.PI * 2);
                        ctx.fill();
                    });
                    break;
                case 2:
                    thirdImage.forEach((point) => {
                        ctx.beginPath();
                        ctx.arc(point.x/3, point.y/3, 1, 0, Math.PI * 2);
                        ctx.fill();
                    });
                    break;
                default:
                    break;
            }
            setCount(count + 1)
        };
        img.src = images[currentImageIndex];
    }, [firstImage, secondImage, thirdImage, canvasRef,currentImageIndex]);

    useEffect(() => {
        if(!client.current.connected){
            client.current.activate()
        }

        client.current.subscribe(`/sub/chat/room/` + localStorage.getItem("roomId") + "/" + userName, (message) => {

            const msg = JSON.parse(message.body);
            if (msg.length > 2) {
                msg.forEach(item => {
                    console.log(item)
                    imageSegmentation(item)
                });
                return;
            }
            imageSegmentation(msg[0])
            const canvas = canvasRef.current;
            const rect = canvas.getBoundingClientRect();
            //const newX = x - rect.left;
            //const newY = y - rect.top;
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
                people: "PARENT",
            }),
        });

    }, [])

    const imageSegmentation = (item) => {
        const { imageNum, x, y } = item.message;
        switch (imageNum) {
            case 0:
                setFirstImage(prevFirstImages => [...prevFirstImages, { x: x, y: y }]);
                break;
            case 1:
                setSecondImage(prevSecondImages => [...prevSecondImages, { x: x, y: y }]);
                break;
            case 2:
                setThirdImage(prevThirdImages => [...prevThirdImages, { x: x, y: y }]);
                break;
            default:
                break;
        }
    }
    const handleButtonClick = () => {
        setShowChart(!showChart);
    };
    const handleBackButtonClick = () => {
        showButton(true)
    }
    const handleNextButtonClick = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }

return(
    <div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <canvas ref={canvasRef} />
            <button onClick={handleNextButtonClick}>다음</button>
        </div>
        <button onClick={handleBackButtonClick}>돌아가기</button>
        <button onClick={handleButtonClick}>Show Chart</button>
        {showChart && (
            <LineChart width={800} height={400} data={images[currentImageIndex]}>
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