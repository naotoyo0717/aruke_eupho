'use client'

import { useParams } from 'next/navigation';
import ReviewHeader from '@/app/components/review/reviewHeader';
import { useState } from 'react';
import styles from '@/app/statics/styles/createReview.module.css';
import ContentField from '@/app/components/review/createReview/contentField';
import TitleField from '@/app/components/review/createReview/titleField';
import ConfirmModal from '@/app/components/review/createReview/confirmModal';
import { ReviewCreateBackButton } from '@/app/components/review/createReview/createReviewButtons';

export default function CreateReviewPage() {
    const { itemId } = useParams(); // itemIdを取得 
    const [title, setTitle] = useState<string>("");
    const [content, setContent] = useState<string>("");
    const [isBlank, setIsBlank] = useState<boolean>(false);

    const spotId = itemId ? Number(itemId) : null;

    const handleContent = (e: React.ChangeEvent<HTMLInputElement>) => {
        setContent(e.target.value);
    };

    const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };

    if (!spotId) {
        return <p>スポットIDが無効です。</p>;
    }

    return (
        <div>
            <div className={styles.createReviewHeader}>
                <ReviewCreateBackButton spotId={spotId} />
                <h2>この場所はどうでしたか？</h2>
                <p>{/*あえて何も書いてない*/}</p>
            </div>
            <ReviewHeader spotId={spotId} />
            <div>
                <div className={styles.isBlankWarning}>
                    {isBlank && <p>見出しと本文の両方を記入してください。</p>}
                </div>
                <div className={styles.textArea}>
                    <div className={styles.titleField}>
                        <TitleField title={title} handleTitle={handleTitle} />
                    </div>
                    <div className={styles.contentField}>
                        <ContentField content={content} handleContent={handleContent} />
                    </div>
                </div>
                <div className={styles.sendButton}>
                    <ConfirmModal
                        spotId={spotId}
                        title={title}
                        setTitle={setTitle}
                        content={content}
                        setContent={setContent}
                        setIsBlank={setIsBlank}
                    />
                </div>
            </div>
        </div>
    );
}
