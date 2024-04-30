import React, {useEffect, useState} from "react";

const ProgressContent = ({contentCountData}) => {
    const [totalCountData, setTotalCountData]  = useState( [
    ]);
    useEffect(() => {
        setTotalCountData([
            { title: "컨텐츠1", count: contentCountData.content1+"회" },
            { title: "컨텐츠2", count: contentCountData.content2+"회" },
            { title: "컨텐츠3", count: contentCountData.content3+"회" },
            { title: "컨텐츠4", count: contentCountData.content4+"회" },
            { title: "컨텐츠5", count: contentCountData.content5+"회" },
            { title: "컨텐츠6", count: contentCountData.content6+"회" },
        ])
    }, [contentCountData]);


    return (
        <div className="total-count">
            <div className="total-title">진행 횟수</div>
            {totalCountData.map((item, index) => (

                <div>
                <div key={index} className="total-count-detail">
                    <h3>{item.title}</h3>
                    <p>{item.count}</p>
                </div>
                <div>
                    <hr/>
                </div>
                </div>
            ))}
        </div>
    )
}

export default ProgressContent