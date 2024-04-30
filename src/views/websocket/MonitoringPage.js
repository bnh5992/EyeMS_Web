import person from "../../assets/image/login/person.png"

import "../../assets/css/monitoring.css"
import SideBar from "../mainPage/SideBar";
import React, {useEffect, useRef, useState} from "react";
import {Client} from "@stomp/stompjs";
import UserOnlineList from "./UserOnlineLIst";
import RealTimePage from "./RealTimePage";


const MonitoringPage = () => {
    const client = useRef(null);
    const [selectedUser, setSelectedUser] = useState(null);
    const [showButtons, setShowButtons] = useState(false);


    return (
        <div className="time-body">
            <SideBar/>
            {!showButtons && (<UserOnlineList setShowButton={setShowButtons} setSelectedUser={setSelectedUser} client={client}/>)}
            {showButtons && (<RealTimePage setShowButton={setShowButtons} selectedUser={selectedUser} client={client}/>)}
        </div>
    );
}

export default MonitoringPage