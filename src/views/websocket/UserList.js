
import React, {useEffect, useState} from 'react';
import {Client} from "@stomp/stompjs";
const UserList = ({selectUser}) => {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        handleUserList()
    }, [selectUser]);


    const handleUserList = async () => {
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

            if (response.ok) {
                response.json().then(data => {
                    console.log(data);
                    const newUserList = data.userList.map(userName => ({
                        username : userName,
                        online: selectUser.includes(userName) ? true : false
                    }));
                    setUsers(newUserList)
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
    return(
        <div>
            <h2>User List</h2>
            <ul>
                {users.map(user => (
                    <li key={user.id}>
                        {user.username} - {user.online ? '온라인' : '오프라인'}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default UserList