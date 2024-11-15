'use client';

import SpotCard from "@/app/components/spot_card/SpotCard";
import { useEffect, useState } from "react";

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
    const [selectedSpots, setSelectedSpots] = useState<{ [key: number]: boolean }>({});

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
                console.log('Fetched spots:', data); // デバッグ用: 取得したデータを確認
                setSpots(data);
            } catch (error) {
                console.error('Error fetching spots:', error);
            }
        };
    
        fetchSpots();

    //     const fetchVisited = async () => {
    //         try {
    //             const response = await fetch('api/searchVisited', {
    //                 method: 'GET',
    //             });

    //             if (!response.ok) {
    //                 throw new Error('Failed to search visited');
    //             }

    //             const data = await response.json();
    //             console.log('Visited spots', data);
    //             setVisited(data);
    //         } catch (error) {
    //             console.error('Error searching visited:', error);
    //        
    //     };

    //     fetchVisited();
    }, []);

    //sconsole.log({visited});
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
