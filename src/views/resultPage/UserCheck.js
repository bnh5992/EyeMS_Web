import React, {useEffect, useState} from "react";

const UserCheck = ({user, updateUser}) =>{
    const [isOverlayVisible, setIsOverlayVisible] = useState(false);

    const toggleOverlay = () => {
        setIsOverlayVisible(!isOverlayVisible);
    };

    useEffect(() => {
    }, [updateUser]);
    return (
        <div>
            <button className="total-toggle-btn" onClick={toggleOverlay}></button>
            {isOverlayVisible &&
                <div id="overlay">
                    {user.current.map((users) => (
                        <div className="total-user-list">
                            <a href={'http://localhost:3000/totalresult'} >{users.name}</a>
                            <div className={'total-user-'+(users.online ? 'on' : 'off')}></div>
                        </div>
                    ))}
                </div>
            }
        </div>
    )
}

export default UserCheck