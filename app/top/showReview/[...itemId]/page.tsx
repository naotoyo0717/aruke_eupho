'use client'

import ReviewHeader from '@/app/components/review/reviewHeader';
import { fetchReviews } from '@/app/actions/reviewActions';
import { PushCreatePageButton, ReviewBackButton } from '@/app/components/ui_parts/Buttons';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Review } from '@/app/types';
import styles from '@/app/statics/styles/showReview.module.css';

export default function ShowReviewPage() {
    const { itemId } = useParams(); // itemIdを取得
    const [reviews, setReviews] = useState<Review[]>([]);

    // itemId を number に変換（undefined の場合に備えて || 0 は使用しない）
    const spotId = itemId ? Number(itemId) : null;

    // spotId が無効な場合のフォールバック
    if (!spotId) {
        return <p>スポットIDが無効です。</p>;
    }

    useEffect(() => {
        const fetchData = async ( spotId: number ) => {
            try {
                const fetchedReviews = await fetchReviews(spotId);
                if (fetchedReviews) {
                    setReviews(fetchedReviews);
                }
            } catch (error) {
                console.error('Error during data fetching:', error);
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
                <div className={styles.separator}></div>
                <div
                    className={styles.reviews}
                >
                    <div>
                    {reviews.length > 0 ? (
                        reviews.map((review) => (
                            <div key={review.id}>
                                <div className={styles.userInfo}>
                                    <img
                                        className={styles.userIcon} 
                                        src={review.userImage}
                                        alt = "ユーザーアイコン"
                                    />
                                    <div className={styles.speech}>
                                        <div className={styles.userName}>{review.userName}</div>
                                        <div className={styles.triangle}></div>
                                    </div>
                                </div>
                                <div className={styles.reviewContent}>
                                    <h3>{review.title}</h3>
                                    <p>{review.content}</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>レビューがまだありません。</p>
                    )}
                    </div>
                </div>
            </div>
        </div>
    );
    
}
