import call from "../../assets/image/call.png"
import lock from "../../assets/image/lock.png"
import logo from "../../assets/image/logo.png"
import person from "../../assets/image/person.png"
import "../../assets/css/register.css"
import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
    const [agencyId, setAgencyId] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordsMatch, setPasswordsMatch] = useState(true);
    const [agencyName, setAgencyName] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const navigate = useNavigate();

    const handleAgencyIdChange = (event) =>{
        setAgencyId(event.target.value);
    };

    const handleAgencyNameChange = (event) =>{
        setAgencyName(event.target.value);
    };

    const handleNameChange = (event) =>{
        setName(event.target.value);
    };

    const handlePhoneChange = (event) =>{
        setPhone(event.target.value);
    };



    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
        setPasswordsMatch(confirmPassword === event.target.value);
    };

    const handleConfirmPasswordChange = (event) => {
        setConfirmPassword(event.target.value);
        setPasswordsMatch(password === event.target.value);
    };




    const handleSignUp = async () => {
        try {
            const response = await fetch('http://localhost:8080/agency/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ agencyId, password , agencyName, name, phone}),
                mode: 'cors'
            });

            if (response.ok) {
                response.json().then(data => {
                    console.log('회원가입 성공');
                    navigate("/login")
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
                href="../../assets/css/register.css"
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
                    보호자 회원가입
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
                        onChange={handleAgencyIdChange}
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
                        onChange={handlePasswordChange}
                    />
                    <i className="fa-regular fa-eye-slash" />
                </div>
                <div id="pass-icon-check">
                    <img
                        height="24px"
                        src={lock}
                        width="24px"
                    />
                    <input
                        placeholder="비밀번호 확인"
                        type="password"
                        value={confirmPassword}
                        onChange={handleConfirmPasswordChange}
                    />
                    <i className="fa-regular fa-eye-slash" />
                </div>
                <div id="name1-icon">
                    <img
                        height="24px"
                        src={person}
                        width="24px"
                    />
                    <input
                        placeholder="보호자 이름"
                        type="text"
                        value={name}
                        onChange={handleNameChange}

                    />
                </div>
                <div id="name2-icon">
                    <img
                        height="24px"
                        src={person}
                        width="24px"
                    />
                    <input
                        placeholder="자녀 이름"
                        type="text"
                    />
                </div>
                <div id="tel-icon">
                    <img
                        height="24px"
                        src={call}
                        width="24px"
                    />
                    <input
                        placeholder="휴대전화"
                        type="text"
                        value={phone}
                        onChange={handlePhoneChange}
                    />
                </div>
            </div>
            <div className="btn">
                <button id="sign-up" onClick={handleSignUp}>
                    회원가입
                </button>
            </div>
            <p>
                이미 계정이 있으신가요?
                <span>
          <a href="/login">
            로그인하기
          </a>
        </span>
            </p>
        </div>
        <script
            dangerouslySetInnerHTML={{
                __html: '    $(document).ready(function(){    $(\'#pass-icon i\').on(\'click\',function(){        $(\'input\').toggleClass(\'active\');        if($(\'input\').hasClass(\'active\')){            $(this).attr(\'class\',"fa-regular fa-eye-slash")            .prev(\'input\').attr(\'type\',"password");        }else{            $(this).attr(\'class\',"fa-regular fa-eye")            .prev(\'input\').attr(\'type\',\'text"\');        }    });    $(\'#pass-icon-check i\').on(\'click\',function(){        $(\'input\').toggleClass(\'active\');        if($(\'input\').hasClass(\'active\')){            $(this).attr(\'class\',"fa-regular fa-eye-slash")            .prev(\'input\').attr(\'type\',"password");        }else{            $(this).attr(\'class\',"fa-regular fa-eye")            .prev(\'input\').attr(\'type\',\'text"\');        }    });});'
            }}
        />
        </body>
        </div>
    )
}

export default SignUp