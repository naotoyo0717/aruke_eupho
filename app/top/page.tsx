'use client'

import SpotCard from "@/app/components/spot_card/SpotCard";
import { useState } from "react";
import { spotArray } from '@/app/statics/spotList';

export default function Top() {
    // 各スポットごとに選択状態を管理するために、idをキーにしたオブジェクトを使用
    const [selectedSpots, setSelectedSpots] = useState<{ [key: number]: boolean }>({});

    // 選択状態を切り替える関数
    const toggleSelect = (id: number) => {
        setSelectedSpots(prevState => ({
            ...prevState,
            [id]: !prevState[id] // クリックされたカードの選択状態を反転
        }));
    };

    return (
        <>
            <h1>トップページ</h1>
            {spotArray.map((item) => (
                <SpotCard 
                    key={item.id} 
                    isSelected={!!selectedSpots[item.id]} 
                    setIsSelected={() => toggleSelect(item.id)} 
                    item={item}
                />
            ))}
        </>
    );
}
