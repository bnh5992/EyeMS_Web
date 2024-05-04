import {useState} from "react";

const UserAdd = () => {
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

    const handleSignUp = async () => {
        try {
            const token = localStorage.getItem('token')

            const response = await fetch('http://localhost:8080/user/adduser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : 'Bearer ' + token
                },
                body: JSON.stringify({ userId, password , name, birth, phone, email, address, gender, glasses}),
                mode: 'cors'
            });

            if (response.ok) {
                response.json().then(data => {
                    console.log('회원가입 성공');
                }).catch(error => {
                    console.error('JSON 파싱 오류:', error);
                });
            } else {
                console.error('가입 실패');
            }

        } catch (error) {
            console.error('오류 발생:', error);
        }
        window.location.reload();
    };
    return(
        <div className="manage-manage">
            <div className="mypage-innerBox2">
                <div className="mypage-infomation2">
                    <div className="mypage-bold">아이디</div>
                    <input type="text" value={userId} onChange={(e) => setUserId(e.target.value)}/>
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
            <div className="mypage-btn">
                <button onClick={handleSignUp}>추가</button>
            </div>
        </div>
    )
}

export default UserAdd