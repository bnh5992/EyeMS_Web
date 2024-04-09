import lock from "../../assets/image/login/lock.png"
import logo from "../../assets/image/login/logo.png"
import person from "../../assets/image/login/person.png"
import "../../assets/css/login.css"
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const Login = () => {
    const [agencyId, setAgencyId] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate('/signup')
    }
    const handleLogin = async () => {
        try {
            const response = await fetch('http://localhost:8080/agency/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ agencyId, password }),
                mode: 'cors'
            });

            if (response.ok) {
                response.json().then(data => {
                    const token = data.token;
                    console.log(token);

                    localStorage.setItem('token', token);
                    localStorage.setItem('agencyId', agencyId);
                    localStorage.setItem('password', password);
                    localStorage.setItem('roomId', data.room);
                    navigate('/socket');
                }).catch(error => {
                    console.error('JSON 파싱 오류:', error);
                });
            } else {
                console.error('로그인 실패');
            }

        } catch (error) {
            console.error('오류 발생:', error);
        }
    };


    return (
        <div className="login-body">
            <div className="login-window">
                <div className="login-logo">
                    <img src={logo} alt="" id="login-logo" />
                    <h2 id="login-info">보호자 로그인</h2>
                </div>
                <div className="login">
                    <div id="login-idicon">
                        <img src={person} width="24px" height="24px" />
                        <input type="text" placeholder="아이디" />
                    </div>
                    <div id="login-passicon">
                        <img src={lock} width="24px" height="24px" />
                        <input type="password" placeholder="비밀번호" />
                    </div>
                </div>
                <div className="login-btn">
                    <button id="login" onClick={handleLogin}>로그인</button>
                    <button id="login-signup" onClick={handleNavigate}>회원가입</button>
                </div>
            </div>
        </div>

    )
}

export default Login