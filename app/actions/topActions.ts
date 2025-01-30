import { SpotType } from "../types";

export const fetchSpots = async () => {
    try {
        const response = await fetch('/api/getSpots', { method: 'GET' });
        if (!response.ok) {
            throw new Error('Failed to fetch spots');
        }
        const data: SpotType[] = await response.json();
        return data;   
    } catch (error) {
        console.error('Error fetching spots:', error);
    }
};


export const fetchVisited = async () => {
    try {
        const response = await fetch('/api/searchVisited', { method: 'GET' });
        if (!response.ok) {
            throw new Error('Failed to search visited');
        }
        const data: { spotId: number }[] = await response.json();
        return data;
    } catch (error) {
        console.error('Error searching visited:', error);
    }
};


export const fetchSelected = async () => {
    try {
        const response = await fetch('/api/searchSelected', { method: 'GET' });
        if (!response.ok) {
            throw new Error('Failed to search selected');
        }

        const data: { spotId: number }[] = await response.json();
        console.log(data);

        const formattedData = data.reduce((acc, item) => {
            acc[item.spotId] = true;
            return acc;
        }, {} as { [key: number]: boolean });

        return formattedData;
    } catch (error) {
        console.log('Error searching selected:', error);
    }
};


