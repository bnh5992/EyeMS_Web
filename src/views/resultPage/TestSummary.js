

const TestSummary = ({testData}) => {

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
                    <th>정답률</th>
                    <th>고정 비율</th>
                    <th>도약 비율</th>
                    <th>회귀 비율</th>
                    <th>읽은 시간 비율</th>
                    <th>풀이 시간 비율</th>
                </tr>
                </thead>
                <tbody>
                {testData.map((item, index) => (
                    <tr key={index}>
                        <td>{item.date}</td>
                        <td>{item.accurate}</td>
                        <td>{item.fixCount}</td>
                        <td>{item.saccade}</td>
                        <td>{item.regression}</td>
                        <td>{item.totalReadTime}</td>
                        <td>{item.questionTime}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}

export default TestSummary