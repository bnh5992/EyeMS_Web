
import person from "../../assets/image/myPage/person.png"
import "../../assets/css/manage.css"
import React, {useEffect, useState} from "react";
import SideBar from "./SideBar";


const ManagePage = () => {


    const data = ['데이터1', '데이터2', '데이터3', '데이터4', '데이터4', '데이터4', '데이터4', '데이터4', '데이터4', '데이터4', '데이터4', '데이터4', '데이터4', '데이터4', '데이터4', '데이터4'];
    const [info, setInfo] = useState(false)
    const [userInfo, setUserInfo] = useState({
        userId : "",
        password : "",
        name : "",
        birth : "2000-01-01",
        phone : "",
        email : "",
        address : "",
        glasses : "",
        gender : ""
    })
    const [users, setUsers] = useState([]);

    useEffect(() => {
        userList();
    }, []);
    const userList = async () => {
        const token = localStorage.getItem('token')
        try {
            const response = await fetch('http://localhost:8080/user/userlist', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },

                mode: 'cors'
            });
            const data = await response.json();
            setUsers(data.userList);
            console.log(users)
        } catch (error) {
            console.error("데이터를 가져오는 중 오류 발생:", error);
        }
    };



    const fetchUserInfo = async (userId) => {
        const token = localStorage.getItem('token')
        try {
            const response = await fetch("http://localhost:8080/user/info", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
                body: JSON.stringify({userId}),
                mode: 'cors'
            });
            if (response.ok) {
                response.json().then(data => {
                    setUserInfo(data)
                    console.log(data)
                }).catch(error => {
                    console.error('JSON 파싱 오류:', error);
                });
            } else {
                console.error('가입 실패');
            }
        } catch (error) {
            console.error("데이터를 가져오는 중 오류 발생:", error);
        }
    };

    const handleShowUserInfo = (user) => {
        fetchUserInfo(user)
        setInfo(true)
    }

    return (
        <div>
            <SideBar/>
            {/* 오른쪽 콘텐츠 */}
            <div className="manage-wrap">
                <div className="mypage-mypage">회원(?) 관리</div>
                <div className="manage-container">
                    <div className="manage-list">

                        <div className="manage-title">
                            <span>회원 목록</span>
                            <button className="manage-add"></button>
                        </div>

                        <div className="manage-search-box">
                            <input type="text" id="manage-search" placeholder="이름? 아이디?"/>
                            <button className="test-search-button"></button>
                        </div>

                        <div className="manage-list-box">
                            {users.map((user, idx) => (
                                <div key={idx} className="manage-user">
                                    <button onClick={() => handleShowUserInfo(user)}>{user}</button>
                                </div>
                            ))}
                        </div>

                    </div>
                    <div className="manage-manage">
                        <div className="mypage-innerBox2">
                            <div className="mypage-infomation2">
                                <div className="mypage-bold">아이디</div>
                                <input type="text" />
                            </div>
                        </div>
                        <div className="mypage-innerBox3">
                            <div className="mypage-infomation2">
                                <div className="mypage-bold">비밀번호</div>
                                <input type="text" />
                            </div>
                        </div>
                        <div className="mypage-innerBox4">
                            <div className="mypage-infomation2">
                                <div className="mypage-bold">비밀번호 확인</div>
                                <input type="text" />
                            </div>
                        </div>
                        <div className="mypage-innerBox2">
                            <div className="mypage-infomation2">
                                <div className="mypage-bold">이름</div>
                                <input type="text" />
                            </div>
                        </div>
                        <div className="mypage-innerBox3">
                            <div className="mypage-infomation2">
                                <div className="mypage-bold">생년월일</div>
                                <input type="text" />
                            </div>
                        </div>
                        <div className="mypage-innerBox3">
                            <div className="mypage-infomation2">
                                <div className="mypage-bold">성별</div>
                                <input type="text" />
                            </div>
                        </div>
                        <div className="mypage-innerBox3">
                            <div className="mypage-infomation2">
                                <div className="mypage-bold">전화번호</div>
                                <input type="text" />
                            </div>
                        </div>
                        <div className="mypage-innerBox3">
                            <div className="mypage-infomation2">
                                <div className="mypage-bold">이메일</div>
                                <input type="text" />
                            </div>
                        </div>
                        <div className="mypage-innerBox3">
                            <div className="mypage-infomation2">
                                <div className="mypage-bold">주소</div>
                                <input type="text" />
                            </div>
                        </div>
                        <div className="mypage-innerBox3">
                            <div className="mypage-infomation2">
                                <div className="mypage-bold">안경착용</div>
                                <input type="text" />
                            </div>
                        </div>
                        <div className="mypage-innerBox4">
                            <div className="mypage-infomation2">
                                <div className="mypage-bold">가입일</div>
                                <input type="text" />
                            </div>
                        </div>
                        <div className="mypage-btn">
                            <button>수정</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default ManagePage