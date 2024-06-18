import React, {useEffect, useState} from "react";

const ProgressContent = ({contentCountData}) => {
    const [totalCountData, setTotalCountData]  = useState( [
        { title: "글자 기억하기", count: "0회" },
        { title: "과일색 맞추기", count: "0회" },
        { title: "토끼를 찾아라", count: "0회" },
        { title: "동물 찾기", count: "0회" },
        { title: "물고기 사냥", count: "0회" },
        { title: "돌고래의 모험", count: "0회" },
    ]);
    useEffect(() => {
        if(contentCountData.content1 !== undefined){
            setTotalCountData([
                { title: "글자 기억하기", count: contentCountData.content1+"회" },
                { title: "과일색 맞추기", count: contentCountData.content2+"회" },
                { title: "토끼를 찾아라", count: contentCountData.content3+"회" },
                { title: "동물 찾기", count: contentCountData.content4+"회" },
                { title: "물고기 사냥", count: contentCountData.content5+"회" },
                { title: "돌고래의 모험", count: contentCountData.content6+"회" },
            ])
        }

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