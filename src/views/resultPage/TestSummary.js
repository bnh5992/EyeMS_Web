

const TestSummary = ({testData}) => {

    const data = [
        { date: '2024-03-28', accuracy: '34점', fixedCount: '67%', questionTime: '67%', regression: '67%', saccade: '67%', totalReadTime: '67%' },
        { date: '2024-03-28', accuracy: '34점', fixedCount: '67%', questionTime: '67%', regression: '67%', saccade: '67%', totalReadTime: '67%' },
        { date: '2024-03-28', accuracy: '34점', fixedCount: '67%', questionTime: '67%', regression: '67%', saccade: '67%', totalReadTime: '67%' },
        { date: '2024-03-28', accuracy: '34점', fixedCount: '67%', questionTime: '67%', regression: '67%', saccade: '67%', totalReadTime: '67%' },
        { date: '2024-03-28', accuracy: '34점', fixedCount: '67%', questionTime: '67%', regression: '67%', saccade: '67%', totalReadTime: '67%' }
    ];
    return(
        <div className="total-contents">
            <div className="total-container">
                <div className="total-title">검사 결과</div>
            </div>
            <table className="total-table">
                <colgroup>
                    <col/>
                    <col/>
                    <col/>
                    <col/>
                    <col/>
                    <col/>
                </colgroup>
                <thead>
                <tr>
                    <th>날짜</th>
                    <th>정확도</th>
                    <th>고정횟수</th>
                    <th>풀이시간</th>
                    <th>회귀</th>
                    <th>도약</th>
                    <th>총시간</th>
                </tr>
                </thead>
                <tbody>
                {testData.map((item, index) => (
                    <tr key={index}>
                        <td>{item.date}</td>
                        <td>{item.accurate}</td>
                        <td>{item.fixCount}</td>
                        <td>{item.questionTime}</td>
                        <td>{item.regression}</td>
                        <td>{item.saccade}</td>
                        <td>{item.totalReadTime}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}

export default TestSummary