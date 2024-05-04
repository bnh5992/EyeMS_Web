
import React, {useEffect, useState} from "react";
import text from "../../assets/image/checkImage/temp2.png";
import SideBar from "../mainPage/SideBar";


import "../../assets/css/test.css"

const TimegraphPage = ({selectData}) => {
    const [images, setImages] = useState();
    const [selectImage, setSelelctImage] = useState();
    const [eyeData, setEyeData] = useState([{}]);

    useEffect(() => {
        initTask()
    }, []);

    const handleFirstClick = () =>{
        setSelelctImage(images.firstImage.image)
        setEyeData(images.firstImage)
    }
    const handleSecondClick = () =>{
        setSelelctImage(images.secondImage.image)
        setEyeData(images.secondImage)
    }
    const handleThirdClick = () => {
        setSelelctImage(images.thirdImage.image)
        setEyeData(images.thirdImage)
    }

    const getEyeData = (name) =>{
        return new Promise((resolve, reject) =>{
            const data = userImageInfo(name);
            resolve(data);
        })
    }

    const initTask = async () => {
        const eyesData = await getEyeData(selectData.userId)
        setImages(eyesData)
        setEyeData(eyesData.firstImage)
        setSelelctImage(eyesData.firstImage.image)
    }

    const userImageInfo = async (userId) => {
        try {
            const response = await fetch("http://localhost:8080/eye/showimage/" + userId +"/" + selectData.date, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                mode: 'cors'
            });
            return await response.json()
        } catch (error) {
            console.error("데이터를 가져오는 중 오류 발생:", error);
        }
    };

    return (
        <div className="time-body">
            <SideBar/>

            <div className="test-main">
                <div className="mypage-mypage">진단결과 > 시계열 그래프</div>
                <div className="test-days">
                    <div>
                        <div className="time-date">{selectData.date.substring(5,7)}월 {selectData.date.substring(8,10)}일 검사</div>
                        <img id="time-text-img" src={"data:image/png;base64," + selectImage}/>

                        <div className="time-button-box">
                            <sapn className="time-button">
                                <button onClick={handleFirstClick}>1</button>
                                <button onClick={handleSecondClick}>2</button>
                                <button onClick={handleThirdClick}>3</button>
                            </sapn>
                        </div>
                    </div>
                </div>
            </div>
            <div className="time-info">
                <div className="time-info-top">검사 결과 요약</div>

                <div className="time-info-main">
                    <table className="time-info-table">
                        <tbody>
                        <tr>
                            <td className="time-info-title">정답률</td>
                            <td className="time-info-data">{eyeData.accurate}%</td>
                        </tr>

                        <tr>
                            <td className="time-info-title">고정</td>
                            <td className="time-info-data">{parseInt(eyeData.fixCount)}</td>
                        </tr>

                        <tr>
                            <td className="time-info-title">도약 </td>
                            <td className="time-info-data">{parseInt(eyeData.saccade)}</td>
                        </tr>

                        <tr>
                            <td className="time-info-title">회귀</td>
                            <td className="time-info-data">{parseInt(eyeData.regression)}</td>
                        </tr>
                        </tbody>
                    </table>

                </div>
            </div>
        </div>

    )
}

export default TimegraphPage