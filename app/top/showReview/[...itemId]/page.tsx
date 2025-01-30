'use client'

import ReviewHeader from '@/app/components/review/reviewHeader';
import { PushCreatePageButton } from '@/app/components/ui_parts/Buttons';
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
            <h1>この場所の口コミ掲示板</h1>
            <PushCreatePageButton
                spotId={spotId}
            />
            <ReviewHeader spotId={spotId} />
            <p>ここにレビューコンテンツを表示します。</p>
        </div>
    );
}
