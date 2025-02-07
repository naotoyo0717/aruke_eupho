import { AllMapType } from "../types";

export const fetchAllMap = async () => {
    try {
        const response = await fetch('/api/getAllMap', { method: 'GET' });
        if (!response.ok) {
            throw new Error('Failed to fetch allMap');
        }
        const data: AllMapType[] = await response.json();
        return data;   
    } catch (error) {
        console.error('Error fetching allMap:', error);
    }
};