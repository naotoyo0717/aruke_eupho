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


export const fetchCreateReview = async (title: string, content: string, spotId: number) => {
    try {
        const response = await fetch('/api/createReview', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/Json',
            },
            body: JSON.stringify({
                title: title,
                content: content,
                spotId: spotId,
            }),
        });
        if(!response.ok) {
            throw new Error('createReviewが失敗しました。');
        }
        console.log("成功");
        return true;
    } catch (error) {
        console.error('createReviewに失敗しました。',error);
        return false;
    }
}