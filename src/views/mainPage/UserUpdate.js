import React, {useEffect, useState} from "react";

const UserUpdate = ({userInfo}) => {
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [name, setName] = useState('');
    const [birth, setBirth] = useState('');
    const [address, setAddress] = useState('');
    const [glasses, setGlasses] = useState('');
    const [gender, setGender] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [date, setDate] = useState('');

    useEffect(() => {
        setUserId(userInfo.userId)
        setBirth(userInfo.birth)
        setPhone(userInfo.phone)
        setAddress(userInfo.address)
        setEmail(userInfo.email)
        setGender(userInfo.gender)
        setGlasses(userInfo.glasses)
        setName(userInfo.name)
        setDate(userInfo.date)
    }, [userInfo]);

    const showDeleteAlert = () => {
        const result = window.confirm('회원 정보를 삭제하시겠습니까?');
        return result;

    };

    const showUpdateAlert = () => {
        const result = window.confirm('회원 정보를 수정하시겠습니까?');
        return result;
    };

    const deleteUser = async (userId) => {
        const token = localStorage.getItem('token')
        try {

            if (showDeleteAlert() === false) return;

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
        } catch (error) {
            console.error("데이터를 가져오는 중 오류 발생:", error);
        }
        window.location.reload();
    };
    const handleUpdateUser = async () => {
        try {

            if (showUpdateAlert() === false) return;

            const token = localStorage.getItem('token')
            const response = await fetch('http://localhost:8080/user/update', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : 'Bearer ' + token
                },
                body: JSON.stringify({ userId, password , name, birth, phone, email, address, gender, glasses, date}),
                mode: 'cors'
            });

            if (response.ok) {
                response.json().then(data => {
                    console.log('업데이트 완료');
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
    return(
        <div className="manage-manage">
            <div className="mypage-innerBox2">
                <div className="mypage-infomation2">
                    <div className="mypage-bold">아이디</div>
                    <input type="text" value={userId}/>
                </div>
            </div>
            <div className="mypage-innerBox3">
                <div className="mypage-infomation2">
                    <div className="mypage-bold">비밀번호</div>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                </div>
            </div>
            <div className="mypage-innerBox4">
                <div className="mypage-infomation2">
                    <div className="mypage-bold">비밀번호 확인</div>
                    <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
                </div>
            </div>
            <div className="mypage-innerBox2">
                <div className="mypage-infomation2">
                    <div className="mypage-bold">이름</div>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)}/>
                </div>
            </div>
            <div className="mypage-innerBox3">
                <div className="mypage-infomation2">
                    <div className="mypage-bold">생년월일</div>
                    <input type="text" value={birth} onChange={(e)=> setBirth(e.target.value)}/>
                </div>
            </div>
            <div className="mypage-innerBox3">
                <div className="mypage-infomation2">
                    <div className="mypage-bold">성별</div>
                    <input type="text" value={gender} onChange={(e) => setGender(e.target.value)}/>
                </div>
            </div>
            <div className="mypage-innerBox3">
                <div className="mypage-infomation2">
                    <div className="mypage-bold">전화번호</div>
                    <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)}/>
                </div>
            </div>
            <div className="mypage-innerBox3">
                <div className="mypage-infomation2">
                    <div className="mypage-bold">이메일</div>
                    <input type="text" value={email} onChange={(e) => setEmail(e.target.value)}/>
                </div>
            </div>
            <div className="mypage-innerBox3">
                <div className="mypage-infomation2">
                    <div className="mypage-bold">주소</div>
                    <input type="text" value={address} onChange={(e) => setAddress(e.target.value)}/>
                </div>
            </div>
            <div className="mypage-innerBox3">
                <div className="mypage-infomation2">
                    <div className="mypage-bold">안경착용</div>
                    <input type="text" value={glasses} onChange={(e) => setGlasses(e.target.value)}/>
                </div>
            </div>
            <div className="mypage-innerBox4">
                <div className="mypage-infomation2">
                    <div className="mypage-bold">가입일</div>
                    <input type="text" value={date}/>
                </div>
            </div>
            <div className="mypage-btn">
                {/*<button onClick={handleDeleteUser}>삭제</button>*/}
                <button id="mypage-delete" onClick={()=> deleteUser(userId)}>삭제</button>
                <button id="mypage-update" onClick={handleUpdateUser}>수정</button>
            </div>
        </div>
    )
}

export default UserUpdate