import call from "../../assets/image/signUp/call.png"
import lock from "../../assets/image/signUp/lock.png"
import logo from "../../assets/image/signUp/logo.png"
import person from "../../assets/image/signUp/person.png"
import "../../assets/css/signup.css"
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
                    navigate("/")
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
        <div className="signup-body">
            <div className="signup-window">
                <div className="signup-logo">
                    <img
                        alt=""
                        id="signup-logo"
                        src={logo}
                    />
                    <h2 id="signup-info">
                        보호자 회원가입
                    </h2>
                </div>
                <div className="signup-login">
                    <div id="signup-id-icon">
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
                    <div id="signup-pass-icon">
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
                    <div id="signup-pass-icon-check">
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
                    <div id="signup-name1-icon">
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
                    <div id="signup-tel-icon">
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
                    <div id="signup-name1-icon">
                        <img
                            height="24px"
                            src={person}
                            width="24px"
                        />
                        <input
                            placeholder="보호자 관계"
                            type="text"
                            value={name}
                            onChange={handleNameChange}
                        />
                    </div>
                </div>
                <div className="signup-btn">
                    <button id="signup-sign-up" onClick={handleSignUp}>
                        회원가입
                    </button>
                </div>
                <p>
                    이미 계정이 있으신가요?
                    <span>
                      <a href="/">
                        로그인하기
                      </a>
                    </span>
                </p>
            </div>
        </div>
    )
}

export default SignUp