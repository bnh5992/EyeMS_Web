
import './App.css';
import {Navigate} from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import Login from "./views/authPage/Login"
import SignUp from "./views/authPage/SignUp"
import MyPage from "./views/mainPage/MyPage";
import ResultPage from "./views/resultPage/ResultPage";
import TestPage from "./views/resultPage/TestPage";
import RealTimePage from "./views/websocket/RealTimePage";
import ManagePage from "./views/mainPage/ManagePage";
import MonitoringPage from "./views/websocket/MonitoringPage";
import TimegraphPage from "./views/resultPage/TimeGraphPage";
function App() {
  return (
      <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/mypage" element={<MyPage/>}/>
          <Route path="/result" element={<ResultPage/>}/>
          <Route path="/test" element={<TestPage/>}/>
          <Route path="/monitoring" element={<MonitoringPage/>}/>
          <Route path="/realtime" element={<RealTimePage/>}/>
          <Route path="/manage" element={<ManagePage/>}/>
          <Route path="/timegraph" element={<TimegraphPage/>}/>
      </Routes>
  );
};

export default App;
