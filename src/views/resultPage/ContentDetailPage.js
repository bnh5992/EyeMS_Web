import horiz from "../../assets/image/testPage/horiz.png"

import "../../assets/css/test.css"
import SideBar from "../mainPage/SideBar";
import React, {useState} from "react";

const ContentPage = () => {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearchInputChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleSearchButtonClick = () => {
        // 여기에 검색 기능 구현
        console.log('Search Query:', searchQuery);
    };


    return (
        <div>
            <SideBar/>
            <div class="test-main">
                <div className="mypage-mypage">콘텐츠 결과 > 목록</div>
                <div class="test-days">
                    {/*오빠가 해야할 일은 여기서 날짜 선택 범위(기간이니까 뒤에 선택 한 게 더 빠르면 안 됨)랑 날짜 선택시 value 변경*/}
                    <div class="test-options">
                        <div>
                            <input type="date" id="test-date" max="2024-12-31" min="2000-01-01" value="2024-04-07"/>
                            <img id="test-img" src={horiz} alt="" />
                            <input type="date" id="test-date" max="2024-12-31" min="2000-01-01" value="2024-04-07"/>
                        </div>

                        <div className={"test-search-container"}>

                            <select name="drop1" id="contents-select">
                                <option value="">콘텐츠 1</option>
                                <option value="">콘텐츠 2</option>
                                <option value="">콘텐츠 3</option>
                            </select>
                            <button className="test-search-button" onClick={handleSearchButtonClick}></button>
                        </div>
                    </div>

                    {/*오빠가 해야할 일은 여기서 데이터 개수만큼 차트 만들기. (반복문으로 해야것지...?)*/}
                    <table className="test-table">
                        <colgroup>
                            <col/>
                            <col/>
                            <col/>
                            <col/>
                        </colgroup>
                        <thead>
                        <tr id="bg">
                            <th>날짜</th>
                            <th>소요시간</th>
                            <th>진행률</th>
                            <th>시계열 그래프</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>2024-04-07</td>
                            <td>34분</td>
                            <td>67%</td>
                            <td>뭬</td>
                        </tr>
                        <tr>
                            <td>2024-04-07</td>
                            <td>34분</td>
                            <td>67%</td>
                            <td>뭬</td>
                        </tr>
                        <tr>
                            <td>2024-04-07</td>
                            <td>34분</td>
                            <td>67%</td>
                            <td>뭬</td>
                        </tr>
                        <tr>
                            <td>2024-04-07</td>
                            <td>34분</td>
                            <td>67%</td>
                            <td>뭬</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

    )
}

export default ContentPage