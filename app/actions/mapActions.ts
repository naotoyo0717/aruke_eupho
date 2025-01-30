import { SpotLocationType } from "../types";

export const fetchSelectedLocation = async (): Promise<SpotLocationType[]> => {
    try {
        const response = await fetch('/api/getSelectedLocation', { method: 'GET' });
        if (!response.ok) {
            throw new Error('Failed to fetch SelectedLocation');
        }
        const data: SpotLocationType[] = await response.json();
        console.log('Fetched data:', data);
        return data;
    } catch (error) {
        console.error('Error fetching SelectedLocation:', error);
        return [];
    }
};