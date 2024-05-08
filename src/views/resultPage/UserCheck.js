import React, {useEffect, useState} from "react";

const UserCheck = ({user, updateUser, setSelectUser}) =>{
    const [isOverlayVisible, setIsOverlayVisible] = useState(false);

    const toggleOverlay = () => {
        setIsOverlayVisible(!isOverlayVisible);
    };

    const handleUserChange = (event) => {
        setSelectUser(event.target.value)
    }

    useEffect(() => {
        console.log(user.current)
    }, [updateUser]);
    return (
        <div>
            <button className="total-toggle-btn" onClick={toggleOverlay}></button>
            {isOverlayVisible &&
                <div id="overlay">
                    {user.current[0].name !== undefined && user.current.map((users) => (
                        <div className="total-user-list">
                            <button onClick={handleUserChange} value={users.name}>{users.name}</button>
                            <div className={'total-user-'+(users.online ? 'on' : 'off')}></div>
                        </div>
                    ))}
                </div>
            }
        </div>
    )
}

export default UserCheck