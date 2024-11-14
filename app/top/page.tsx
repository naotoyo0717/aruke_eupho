'use client';

import SpotCard from "@/app/components/spot_card/SpotCard";
import { useEffect, useState } from "react";

type SpotType = {
    id: number;
    title: string;
    explanation: string;
    address: string;
    pictureUrl: string;
};

export default function Top() {
    const [spots, setSpots] = useState<SpotType[]>([]);
    const [selectedSpots, setSelectedSpots] = useState<{ [key: number]: boolean }>({});

    // データベースからスポット情報を取得
    useEffect(() => {
        const fetchSpots = async () => {
            try {
                const response = await fetch('/api/getSpots', {
                    method: 'GET',
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch spots');
                }

                const data = await response.json();
                setSpots(data);
            } catch (error) {
                console.error('Error fetching spots:', error);
            }
        };

        fetchSpots();
    }, []);

    // 選択状態を切り替える関数
    const toggleSelect = (id: number) => {
        setSelectedSpots(prevState => ({
            ...prevState,
            [id]: !prevState[id],
        }));
    };

    return (
        <>
            <h1>トップページ</h1>
            {spots.map((item) => (
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
