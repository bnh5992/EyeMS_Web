import call from "../../assets/image/call.png"
import lock from "../../assets/image/lock.png"
import logo from "../../assets/image/logo.png"
import person from "../../assets/image/person.png"
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
        <div
            key="1"
            lang="en"
        >
        <head>
            <meta charSet="UTF-8" />
            <meta
                content="width=device-width, initial-scale=1.0"
                name="viewport"
            />
            <title>
                Document
            </title>
            <link
                href="../../assets/css/login.css"
                rel="stylesheet"
            />
            <link
                crossOrigin="anonymous"
                href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
                integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA=="
                referrerPolicy="no-referrer"
                rel="stylesheet"
            />
            <script
                crossOrigin="anonymous"
                integrity="sha256-o88AwQnZB+VDvE9tvIXrMQaPlFFSUTR+nldQm1LuPXQ="
                src="https://code.jquery.com/jquery-3.6.1.min.js"
            />
        </head>
        <body>
        <div className="window">
            <div className="logo">
                <img
                    alt=""
                    id="logo"
                    src={logo}
                />
                <h2 id="info">
                    보호자 로그인
                </h2>
            </div>
            <div className="login">
                <div id="id-icon">
                    <img
                        height="24px"
                        src={person}
                        width="24px"
                    />
                    <input
                        placeholder="아이디"
                        type="text"
                        value={agencyId}
                        onChange={(e) => setAgencyId(e.target.value)}
                    />
                </div>
                <div id="pass-icon">
                    <img
                        height="24px"
                        src={lock}
                        width="24px"
                    />
                    <input
                        placeholder="비밀번호"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <i className="fa-regular fa-eye-slash" />
                </div>
            </div>
            <div className="btn">
                <button id="login" onClick={handleLogin} >
                    로그인
                </button>

                <button id="signup" onClick={handleNavigate}>
                    회원가입
                </button>

            </div>
        </div>
        <script
            dangerouslySetInnerHTML={{
                __html: '    $(document).ready(function(){    $(\'#pass-icon i\').on(\'click\',function(){        $(\'input\').toggleClass(\'active\');        if($(\'input\').hasClass(\'active\')){            $(this).attr(\'class\',"fa-regular fa-eye-slash")            .prev(\'input\').attr(\'type\',"password");        }else{            $(this).attr(\'class\',"fa-regular fa-eye")            .prev(\'input\').attr(\'type\',\'text"\');        }    });});'
            }}
        />
        </body>
        </div>
    )
}

export default Login