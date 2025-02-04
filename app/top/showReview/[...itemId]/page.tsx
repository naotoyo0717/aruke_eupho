'use client'

import ReviewHeader from '@/app/components/review/reviewHeader';
import { fetchReviews } from '@/app/actions/reviewActions';
import { PushCreatePageButton, ReviewBackButton } from '@/app/components/ui_parts/Buttons';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Review } from '@/app/types';
import styles from '@/app/statics/styles/showReview.module.css';
import ReviewCard from '@/app/components/review/showReview/reviewCard';

export default function ShowReviewPage() {
    const { itemId } = useParams();
    const [reviews, setReviews] = useState<Review[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const spotId = itemId ? Number(itemId) : null;

    if (!spotId) {
        return <p>スポットIDが無効です。</p>;
    }

    useEffect(() => {
        const fetchData = async (spotId: number) => {
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
        fetchData(spotId);
    }, [spotId]);

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
                                <ReviewCard
                                    review = {review}
                                />
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
