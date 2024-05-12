
import person from "../../assets/image/myPage/person.png"
import "../../assets/css/manage.css"
import React, {useEffect, useState} from "react";
import SideBar from "./SideBar";
import UserUpdate from "./UserUpdate";
import UserAdd from "./UserAdd";


const ManagePage = () => {
    const [selectUser, setSelectUser] = useState('');
    const [isAdd, setIsAdd] = useState(true)
    const [userInfo, setUserInfo] = useState({
    })
    const [reloadCount, setReloadCount] = useState(0);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        if(selectUser === ''){
            userList();
            return
        }
        selectUserList();

    }, [selectUser, reloadCount]);



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
            await setUsers(data.userList);
        } catch (error) {
            console.error("데이터를 가져오는 중 오류 발생:", error);
        }
    };

    const selectUserList = async () => {
        const token = localStorage.getItem('token')
        console.log(users)
        try {
            const response = await fetch('http://localhost:8080/user/user/' + selectUser, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },

                mode: 'cors'
            });
            const data = await response.json();
            await setUsers(data.userList);
        } catch (error) {
            console.error("데이터를 가져오는 중 오류 발생:", error);
        }
    };

    const deleteUser = async (userId) => {
        const token = localStorage.getItem('token')
        console.log(JSON.stringify({userId}))
        try {
            const response = await fetch("http://localhost:8080/user/delete", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
                body: JSON.stringify({userId}),
                mode: 'cors'
            });
            const data = await response.json();
            const now = reloadCount+1
            setReloadCount(now)
            console.log(data)
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
        setIsAdd(false)
        fetchUserInfo(user)
    }


    const handleAddClick = () => {

        setIsAdd(true)
    }

    return (
        <div>
            <SideBar/>
            {/* 오른쪽 콘텐츠 */}
            <div className="manage-wrap">
                <div className="mypage-mypage">회원 관리</div>
                <div className="manage-container">
                    <div className="manage-list">

                        <div className="manage-title">
                            <span>회원 목록</span>
                            <button className="manage-add" onClick={handleAddClick}></button>
                        </div>

                        <div className="manage-search-box">
                            <input type="text" id="manage-search" placeholder="아이디"
                                value={selectUser} onChange={(e) => setSelectUser(e.target.value)}
                            />
                        </div>

                        <div className="manage-list-box">
                            {users.map((user, idx) => (
                                <div key={idx} className="manage-user">
                                    <button onClick={() => handleShowUserInfo(user)}>{user}</button>
                                </div>
                            ))}
                        </div>

                    </div>
                    {!isAdd &&<UserUpdate userInfo={userInfo}/>}
                    {isAdd && <UserAdd/>}
                </div>
            </div>
        </div>

    )
}

export default ManagePage