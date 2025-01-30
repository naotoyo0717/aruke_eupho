// app/top/review/[itemId]/page.tsx
'use client'

import { useParams } from 'next/navigation'; // useParamsフックを使用してparamsを取得

export default function CreateReviewPage() {
    const { itemId } = useParams(); // itemIdを取得

    return (
        <div>
            <h1>レビュー: {itemId}</h1>
            <p>ここでレビューを書き込みます。</p>
        </div>
    );
}
