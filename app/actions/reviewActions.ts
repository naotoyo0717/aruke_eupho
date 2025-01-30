import { Review } from "../types";

export const fetchReviews = async (spotId: number) => {
    console.log("Fetching reviews for spotId:", spotId); // ← 追加
    try {
        const response = await fetch(`/api/getReview?spotId=${spotId}`, { method: 'GET' });
        if (!response.ok) {
            throw new Error('Failed to fetch reviews');
        }
        const data: Review[] = await response.json();
        console.log("Fetched reviews:", data); // ← 追加
        return data;
    } catch (error) {
        console.log('Error fetching reviews:', error);
    }
}