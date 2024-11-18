"use client"

import { useEffect, useState } from "react";
import SpotCard from "@/app/components/spot_card/SpotCard";
//import { SpotArrayType } from '@/app/statics/spotList';

type SpotType = {
    id: number;
    title: string;
    explanation: string;
    address: string;
    pictureUrl: string;
    visited: boolean;
};

export default function Top() {
    const [spots, setSpots] = useState<SpotType[]>([]);
    const [visited, setVisited] = useState<{ spotId: number }[]>([]); // visited 配列
    const [selectedSpots, setSelectedSpots] = useState<{ [key: number]: boolean }>({});

    useEffect(() => {
        const fetchSpots = async () => {
            try {
                const response = await fetch('/api/getSpots', { method: 'GET' });
                if (!response.ok) {
                    throw new Error('Failed to fetch spots');
                }
                const data: SpotType[] = await response.json();
                setSpots(data);
            } catch (error) {
                console.error('Error fetching spots:', error);
            }
        };

        const fetchVisited = async () => {
            try {
                const response = await fetch('/api/searchVisited', { method: 'GET' });
                if (!response.ok) {
                    throw new Error('Failed to search visited');
                }
                const data: { spotId: number }[] = await response.json();
                setVisited(data);
            } catch (error) {
                console.error('Error searching visited:', error);
            }
        };

        fetchSpots();
        fetchVisited();
    }, []);

    const handleVisitedChange = (id: number, newVisited: boolean) => {
        setVisited((prevVisited) => {
            // 既にvisitedされている場合、削除または更新
            const isAlreadyVisited = prevVisited.some((spot) => spot.spotId === id);
            if (newVisited && !isAlreadyVisited) {
                return [...prevVisited, { spotId: id }];
            } else if (!newVisited && isAlreadyVisited) {
                return prevVisited.filter((spot) => spot.spotId !== id);
            }
            return prevVisited;
        });
    };

    return (
        <>
            <h1>トップページ</h1>
            {spots.map((item) => {
                // visited 配列内に item.id と一致する spotId があれば visited とする
                const isVisited = visited.some((v) => v.spotId === item.id);

                return (
                    <SpotCard
                        key={item.id}
                        isSelected={!!selectedSpots[item.id]}
                        setIsSelected={() => setSelectedSpots((prevState) => ({
                            ...prevState,
                            [item.id]: !prevState[item.id],
                        }))}
                        item={item}
                        visited={isVisited}
                        onVisitedChange={handleVisitedChange} // visitedの変更を受け取る関数を渡す
                    />
                );
            })}
        </>
    );
}
