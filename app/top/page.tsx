"use client";

import { useEffect, useState } from "react";
import SpotCard from "@/app/components/spot_card/SpotCard";
import { VisitedCounter } from "../components/ui_parts/VisitedCounter";
import { ResetSelectionButton } from "../components/ui_parts/Buttons";

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
    const [visited, setVisited] = useState<{ spotId: number }[]>([]);
    const [selectedSpots, setSelectedSpots] = useState<{ [key: number]: boolean }>({});
    const [visitedCounter, setVisitedCounter] = useState<number>(0);

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
                setVisitedCounter(data.length);
            } catch (error) {
                console.error('Error searching visited:', error);
            }
        };

        const fetchSelected = async () => {
            try {
                const response = await fetch('/api/searchSelected', { method: 'GET' });
                if (!response.ok) {
                    throw new Error('Failed to search selected');
                }
                const data: { spotId: number }[] = await response.json();
                console.log(data);
        
                // data を `{ [key: number]: boolean }` 型に変換
                const formattedData = data.reduce((acc, item) => {
                    acc[item.spotId] = true; // 選択済みのスポットを `true` として設定
                    return acc;
                }, {} as { [key: number]: boolean });
        
                setSelectedSpots(formattedData); // 型に一致したデータを渡す
            } catch (error) {
                console.log('Error searching selected:', error);
            }
        };

        fetchSpots();
        fetchVisited();
        fetchSelected();
    }, []);

    const handleVisitedChange = (id: number, newVisited: boolean) => {
        setVisited((prevVisited) => {
            const isAlreadyVisited = prevVisited.some((spot) => spot.spotId === id);
            if (newVisited && !isAlreadyVisited) {
                const updatedVisited = [...prevVisited, { spotId: id }];
                setVisitedCounter(updatedVisited.length);
                return updatedVisited;
            } else if (!newVisited && isAlreadyVisited) {
                const updatedVisited = prevVisited.filter((spot) => spot.spotId !== id);
                setVisitedCounter(updatedVisited.length);
                return updatedVisited;
            }
            return prevVisited;
        });
    };

    return (
        <>
            <ResetSelectionButton/>
            <VisitedCounter visitedCounter={visitedCounter} />
            {spots.map((item) => {
                const isVisited = visited.some((v) => v.spotId === item.id);
                const isSelected = !!selectedSpots[item.id]; // 修正
                return (
                    <SpotCard
                        key={item.id}
                        isSelected={isSelected}
                        setIsSelected={() =>
                            setSelectedSpots((prevState) => ({
                                ...prevState,
                                [item.id]: !prevState[item.id],
                            }))
                        }
                        item={item}
                        visited={isVisited}
                        onVisitedChange={handleVisitedChange}
                    />
                );
            })}
        </>
    );
    
}
