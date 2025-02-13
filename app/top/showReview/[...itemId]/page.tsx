'use client'

import ReviewHeader from '@/app/components/review/reviewHeader';
import { fetchReviews } from '@/app/actions/reviewActions';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Review } from '@/app/types';
import styles from '@/app/statics/styles/showReview.module.css';
import ReviewCard from '@/app/components/review/showReview/reviewCard';
import { PushCreatePageButton, ReviewBackButton } from '@/app/components/review/showReview/showReviewButtons';

export default function ShowReviewPage() {
    const { itemId } = useParams();
    const [reviews, setReviews] = useState<Review[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const spotId = itemId ? Number(itemId) : null;

    useEffect(() => {
        if (!spotId) return; // spotId が null の場合は何もしない

        const fetchData = async () => {
            try {
                setIsLoading(true);
                const fetchedReviews = await fetchReviews(spotId);
                if (fetchedReviews) {
                    setReviews(fetchedReviews);
                }
            } catch (error) {
                console.error('Error during data fetching:', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, [spotId]);

    if (!spotId) {
        return <p>スポットIDが無効です。</p>;
    }

    return (
        <div className={styles.reviewPage}>
            <div className={styles.showReviewHeader}>
                <ReviewBackButton />
                <h2>この場所の口コミ掲示板</h2>
                <PushCreatePageButton spotId={spotId} />
            </div>
            <div>
                <ReviewHeader spotId={spotId} />
                <div className={styles.reviews}>
                    <div>
                        {isLoading ? (
                            <p>{/*あえて何も書いていない*/}</p>
                        ) : reviews.length > 0 ? (
                            reviews.map((review) => (
                                <ReviewCard key={review.id} review={review} />
                            ))
                        ) : (
                            <div className={styles.notReview}>
                                <p>レビューはまだありません。</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
