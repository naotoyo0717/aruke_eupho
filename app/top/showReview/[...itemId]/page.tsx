'use client'

import ReviewHeader from '@/app/components/review/reviewHeader';
import { fetchReviews } from '@/app/actions/reviewActions';
import { PushCreatePageButton } from '@/app/components/ui_parts/Buttons';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Review } from '@/app/types';

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
        <div>
            <h1>この場所の口コミ掲示板</h1>
            <PushCreatePageButton spotId={spotId} />
            <ReviewHeader spotId={spotId} />
    
            {/* レビューリストを表示 */}
            <div>
                {reviews.length > 0 ? (
                    reviews.map((review) => (
                        <div key={review.id} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
                            <h3>タイトル：{review.title}</h3>
                            <p>コンテント：{review.content}</p>
                            <p>ユーザー名：{review.userName}</p>
                            <img
                                src={review.userImage}
                            />
                        </div>
                    ))
                ) : (
                    <p>レビューがまだありません。</p>
                )}
            </div>
    
            <p>ここにレビューコンテンツを表示します。</p>
        </div>
    );
    
}
