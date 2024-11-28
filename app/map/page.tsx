'use client';

import { useEffect } from "react";
import { SpotLocationType } from "../types";

export default function Map() { // 関数名を大文字に変更
    useEffect(() => {
        const fetchSelectedLocation = async () => {
            try {
                const response = await fetch('/api/getSelectedLocation', { method: 'GET' });
                if (!response.ok) {
                    throw new Error('Failed to fetch SelectedLocation');
                }
                const data: SpotLocationType[] = await response.json();
                console.log('Fetched data:', data);
            } catch (error) {
                console.log('Error fetching SelectedLocation:', error);
            }
        };

        fetchSelectedLocation();
    }, []);

    return (
        <>
            マップです。
        </>
    );
}
