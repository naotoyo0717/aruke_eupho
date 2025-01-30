'use client'

import ReviewHeader from '@/app/components/review/reviewHeader';
import { useParams } from 'next/navigation';

export default function ShowReviewPage() {
    const { itemId } = useParams(); // itemIdを取得

    // itemId を number に変換（undefined の場合に備えて || 0 は使用しない）
    const spotId = itemId ? Number(itemId) : null;

    // spotId が無効な場合のフォールバック
    if (!spotId) {
        return <p>スポットIDが無効です。</p>;
    }

    return (
        <div>
            <ReviewHeader spotId={spotId} />
            <h1>レビュー: {spotId}</h1>
            <p>ここにレビューコンテンツを表示します。</p>
        </div>
    );
}
