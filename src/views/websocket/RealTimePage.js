import React, {useEffect, useRef, useState} from "react";
import temp1 from "../../assets/image/checkImage/temp1.png";
import temp2 from "../../assets/image/checkImage/temp2.png";
import temp3 from "../../assets/image/checkImage/temp3.png";
import SideBar from "../mainPage/SideBar";


import "../../assets/css/test.css"
import {CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis} from "recharts";

const RealTimePage = ({setShowButton, selectedUser, client}) => {

    const [isGraphVisible, setGraphVisibility] = useState(true);
    const images = [temp1, temp2, temp3]
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [firstImage, setFirstImage] = useState([{}])
    const [secondImage, setSecondImage] = useState([{}])
    const [thirdImage, setThirdImage] = useState([{}])
    const [nowData, setNowData] = useState([{}])

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
            canvas.width = img.width / 3;
            canvas.height = img.height / 3;

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
                        ctx.arc(point.x / 3, point.y / 3, 5, 0, Math.PI * 2);
                        ctx.fill();
                    });
                    break;
                case 1:
                    secondImage.forEach((point) => {
                        ctx.beginPath();
                        ctx.arc(point.x / 3, point.y / 3, 5, 0, Math.PI * 2);
                        ctx.fill();
                    });
                    break;
                case 2:
                    thirdImage.forEach((point) => {
                        ctx.beginPath();
                        ctx.arc(point.x / 3, point.y / 3, 5, 0, Math.PI * 2);
                        ctx.fill();
                    });
                    break;
                default:
                    break;
            }
            setCount(count + 1)
        };
        img.src = images[currentImageIndex];
    }, [firstImage, secondImage, thirdImage, canvasRef, currentImageIndex]);

    useEffect(() => {
        if (!client.current.connected) {
            client.current.activate()
        }

        client.current.subscribe(`/sub/chat/room/` + localStorage.getItem("roomId") + "/" + selectedUser, (message) => {

            const msg = JSON.parse(message.body);
            if (msg.length > 2) {
                msg.forEach(item => {
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
                sender: selectedUser,
                message: {
                    x: 1,
                    y: 1,
                },
                people: "PARENT",
            }),
        });

    }, [])

    const imageSegmentation = (item) => {
        const {imageNum, x, y} = item.message;
        switch (imageNum) {
            case 0:
                setFirstImage(prevFirstImages => [...prevFirstImages, {x: x, y: y}]);
                break;
            case 1:
                setSecondImage(prevSecondImages => [...prevSecondImages, {x: x, y: y}]);
                break;
            case 2:
                setThirdImage(prevThirdImages => [...prevThirdImages, {x: x, y: y}]);
                break;
            default:
                break;
        }
    }
    const handleButtonClick = () => {
        setShowChart(!showChart);
    };
    const handleBackButtonClick = () => {
        setShowButton(true)
    }
    const handleNextButtonClick = (num) => {
        setCurrentImageIndex(num);
        switch (num) {
            case 0:
                setNowData(firstImage);
                break;
            case 1:
                setNowData(secondImage);
                break;
            case 2:
                setNowData(thirdImage);
                break;
            default:
                break;
        }
    }


    const toggleGraphVisibility = () => {
        setGraphVisibility(!isGraphVisible);
    };


    return (
        <div>
            <div className= "real-body-margin">
                <div className="mypage-mypage">실시간 모니터링</div>
                <div className="real-main">
                    <div
                        className="time-date">{new Date().getMonth() + 1}월 {new Date().getDate()}일 {selectedUser} </div>
                    <canvas id="real-text-img" ref={canvasRef}/>
                    <div className="time-button-box">
                        <sapn className="time-button">
                            <button onClick={() => handleNextButtonClick(0)}>1</button>
                            <button onClick={() => handleNextButtonClick(1)}>2</button>
                            <button onClick={() => handleNextButtonClick(2)}>3</button>
                        </sapn>
                    </div>
                </div>
            </div>

            {/*<button className={isGraphVisible ? "time-show-graph" : "time-no-show'}
                    onClick={toggleGraphVisibility}></button>
            <div className={isGraphVisible ? 'real-graph' : 'real-graph-hidden'}>
                <LineChart width={1000} height={200} data={nowData}>
                    <CartesianGrid strokeDasharray="3 3"/>
                    <XAxis dataKey="timestamp"/>
                    <YAxis/>
                    <Tooltip/>
                    <Legend/>
                    <Line type="monotone" dataKey="x" stroke="#8884d8"/>
                    <Line type="monotone" dataKey="y" stroke="#8884d8"/>
                </LineChart>
            </div>*/}
        </div>

    )
}

export default RealTimePage