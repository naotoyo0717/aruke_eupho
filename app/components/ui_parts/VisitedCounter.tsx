'use client'

import { useEffect, useState } from "react"
import styles from "@/app/statics/styles/visitedCounter.module.css"

interface VisitedCounterProps {
    visitedCounter: number;
}

export function VisitedCounter({ visitedCounter }: VisitedCounterProps) {
    const [allPlaces, setAllPlaces] = useState<number>(0);

    // すべてのスポットを取得
    useEffect(() => {
        const fetchAllplaces = async () => {
            try {
                const response = await fetch('/api/getSpots', { method: 'GET' });
                if (!response.ok) {
                    throw new Error('スポットの取得に失敗しました。');
                }
                const data: { spotId: number }[] = await response.json();
                setAllPlaces(data.length);
            } catch (error) {
                console.error('スポットの取得に失敗しました。:', error);
            }
        };

        fetchAllplaces();
    }, []);


    return (
        <div>
            <div className={styles.visitedCounter}>
                巡礼済 {visitedCounter}/{allPlaces}
            </div>
        </div>
    );
}
