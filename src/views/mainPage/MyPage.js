
import logo from "../../assets/image/myPage/logo.png"
import all from "../../assets/image/myPage/all.png"
import chart from "../../assets/image/myPage/chart.png"
import myPageBlue from "../../assets/image/myPage/mypageblue.png"
import live from "../../assets/image/myPage/live.png"
import person from "../../assets/image/myPage/person.png"
import "../../assets/css/mypage.css"
import React, {useEffect, useState} from "react";
import SideBar from "./SideBar";
import {useNavigate} from "react-router-dom";


const MyPage = () => {
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordsMatch, setPasswordsMatch] = useState(true);
    const [phone, setPhone] = useState('');
    const [agencyId, setAgencyId] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [agencyName, setAgencyName] = useState('');
    const [birth, setBirth] = useState('');
    const [date, setDate] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [gender, setGender] = useState('')
    const navigate = useNavigate();


    const handleEmailChange = (event) => {
        setEmail(event.target.value)
    }

    const handleAddressChange = (event) => {
        setAddress(event.target.value)
    }

    const handlePhoneChange = (event) => {
        setPhone(event.target.value)
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
        setPasswordsMatch(confirmPassword === event.target.value);
    };

    const handleConfirmPasswordChange = (event) => {
        setConfirmPassword(event.target.value);
        setPasswordsMatch(password === event.target.value);
    };



    useEffect(() => {
        runTask()

    }, []);

    const runTask = async () => {
        const agencyData = await getData();
        console.log(agencyData)
        setAgencyId(agencyData["agencyId"]);
        setName(agencyData["name"]);
        setAgencyName(agencyData["agencyName"]);
        setPhone(agencyData["phone"]);
        setBirth(agencyData["birth"])
        setDate(agencyData["date"].toString())
        setEmail(agencyData["email"])
        setGender(agencyData["gender"])
        setAddress(agencyData["address"])
    }

    const getData = () =>{
        return new Promise((resolve, reject) =>{
            const data = fetchAgencyInfo();
            resolve(data);
        })
    }

    const fetchAgencyInfo = async () => {

        const token = localStorage.getItem('token')
        try {
            const response = await fetch("http://localhost:8080/agency/info", {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },

                mode: 'cors'
            });

            return await response.json();
        } catch (error) {
            console.error("데이터를 가져오는 중 오류 발생:", error);
        }

    };

    const fetchAgencyDelete = async () => {

        const token = localStorage.getItem('token')
        try {
            if (showDeleteAlert() === false) return;

            const response = await fetch("http://localhost:8080/agency/delete", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },

                mode: 'cors'
            });

            if (response.ok) {
                response.json().then(data => {
                    localStorage.clear()
                    navigate("/")
                }).catch(error => {
                    console.error('JSON 파싱 오류:', error);
                });
            } else {
                console.error('탈퇴 실패');
            }
        } catch (error) {
            console.error("데이터를 가져오는 중 오류 발생:", error);
        }

    };

    const showAlert = () => {
        const result = window.confirm('정보를 수정하시겠습니까?');
        return result;
    };

    const showDeleteAlert = () => {
        const result = window.confirm('탈퇴하시겠습니까?');
        return result;

    };


    const handleUpdateAgencyInfo = async () => {
        try {
            if(!passwordsMatch) return
            if (showAlert() === false) return;
            const token = localStorage.getItem('token')

            const response = await fetch('http://localhost:8080/agency/update', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : 'Bearer ' + token
                },
                body: JSON.stringify({ agencyId, password , phone, email, address}),
                mode: 'cors'
            });

            if (response.ok) {
                response.json().then(data => {
                    console.log(data);
                }).catch(error => {
                    console.error('JSON 파싱 오류:', error);
                });
            } else {
                console.error('가입 실패');
            }
        } catch (error) {
            console.error('오류 발생:', error);
        }
    };

    return (
        <div>
            <SideBar/>
            <div className="mypage-wrap">
                <div className="mypage-mypage">마이페이지 > 기관 정보</div>
                <div className="mypage-contentBox">
                    <div className="mypage-profile">
                        <img src={person} width="40px" />
                        <div className="mypage-name">{name}({agencyId})</div>
                    </div>
                    <div className="mypage-innerBox2">
                        <div className="mypage-infomation2">
                            <div className="mypage-bold">비밀번호</div>
                            <input type="password"
                                   value={password}
                                   onChange={handlePasswordChange}
                            />
                        </div>
                    </div>
                    <div className="mypage-innerBox4">
                        <div className="mypage-infomation2">
                            <div className="mypage-bold">비밀번호 확인</div>
                            <input type="password"
                                   value={confirmPassword}
                                   onChange={handleConfirmPasswordChange}
                            />

                        </div>
                        {!passwordsMatch && <h6 id="error-message">
                            패스워드가 일치하지 않습니다
                        </h6>}
                    </div>
                    <div className="mypage-innerBox2">
                        <div className="mypage-infomation2">
                            <div className="mypage-bold">생년월일</div>
                            <input type="text"
                                   value={birth}
                                   readOnly={true}
                                   className="readonly-input"
                            />
                        </div>
                    </div>
                    <div className="mypage-innerBox3">
                        <div className="mypage-infomation2">
                            <div className="mypage-bold">성별</div>
                            <input type="text"
                                   value={gender}
                                   readOnly={true}
                                   className="readonly-input"
                            />
                        </div>
                    </div>
                    <div className="mypage-innerBox3">
                        <div className="mypage-infomation2">
                            <div className="mypage-bold">전화번호</div>
                            <input type="text"
                                   value={phone}
                                   onChange={handlePhoneChange}
                            />
                        </div>
                    </div>
                    <div className="mypage-innerBox3">
                        <div className="mypage-infomation2">
                            <div className="mypage-bold">이메일</div>
                            <input type="text"
                                   value={email}
                                   onChange={handleEmailChange}
                            />
                        </div>
                    </div>
                    <div className="mypage-innerBox3">
                        <div className="mypage-infomation2">
                            <div className="mypage-bold">주소</div>
                            <input type="text"
                                   value={address}
                                   onChange={handleAddressChange}
                            />
                        </div>
                    </div>
                    <div className="mypage-innerBox3">
                        <div className="mypage-infomation2">
                            <div className="mypage-bold">기관명</div>
                            <input type="text"
                                   value={agencyName}
                                   readOnly={true}
                                   className="readonly-input"
                            />
                        </div>
                    </div>
                    <div className="mypage-innerBox4">
                        <div className="mypage-infomation2">
                            <div className="mypage-bold">가입일</div>
                            <input type="text"
                                   value={date}
                                   readOnly={true}
                                   className="readonly-input"
                            />
                        </div>
                    </div>
                    <div className="mypage-btn">
                        <button id="mypage-delete" onClick={fetchAgencyDelete}>탈퇴</button>
                        <button id="mypage-update" onClick={handleUpdateAgencyInfo}>수정</button>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default MyPage