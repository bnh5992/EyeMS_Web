import React, {useEffect, useState} from "react";


const ContentSummary = ({contentData}) => {




    useEffect(() => {
    }, []);






    return(
        <div className="days">
            <div className="total-container">
                <div className="total-title">메이플스토리</div>
            </div>
            <table className="total-table">
                <colgroup>
                    <col />
                    <col />
                    <col />
                    <col />
                </colgroup>
                <thead>
                <tr>
                    <th className="summary-date">날짜</th>
                    <th className="summary-name">컨텐츠 이름</th>
                    <th className="summary-score">점수</th>
                </tr>
                </thead>
                <tbody>
                {contentData.map((item, index) => (
                    <tr key={index}>
                        <td>{item.date}</td>
                        <td>{item.contentName}</td>
                        <td>{item.score}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}

export default ContentSummary