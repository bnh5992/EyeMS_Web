
import './App.css';
import {Navigate} from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import Login from "./views/authPage/Login"
import SignUp from "./views/authPage/SignUp"
import Socket from "./views/websocket/Socket"
import MyPage from "./views/mainPage/MyPage";
function App() {
  return (

      <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/socket" element={<Socket />} />
          <Route path="/mypage" element={<MyPage/>}/>
      </Routes>

  );
};

export default App;
