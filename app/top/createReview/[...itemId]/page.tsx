'use client'

import { useParams } from 'next/navigation';
import ReviewHeader from '@/app/components/review/reviewHeader';
import { ReviewCreateBackButton, ReviewCreateSendButton } from '@/app/components/ui_parts/Buttons';
import { TextField } from '@mui/material';
import { useState } from 'react';
import styles from '@/app/statics/styles/createReview.module.css';

export default function CreateReviewPage() {
    const { itemId } = useParams(); // itemIdを取得 
    const [title, setTitle] = useState<string>("");
    const [content, setContent] = useState<string>("");
    const [isBlank, setIsBlank] = useState<boolean>(false);

    const spotId = itemId ? Number(itemId) : null;

    const handleContent = (e: React.ChangeEvent<HTMLInputElement>) => {
        setContent(e.target.value);
        console.log(e.target.value);
    };
    const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
        console.log(e.target.value);
    };

    if (!spotId) {
        return <p>スポットIDが無効です。</p>;
    }

    return (
        <div>
            <div className={styles.createReviewHeader}>
                <ReviewCreateBackButton
                    spotId = {spotId}
                />
                <h1>この場所はどうでしたか？</h1>
                <div>{/*あえて何も書いていない*/}</div>
            </div>
            <ReviewHeader spotId={spotId} />
            <div>
                <div className={styles.isBlankWarning}>
                    {isBlank == true ? <p>見出しと本文の両方を記入してください。</p> : ""}
                </div>
                <div className={styles.textArea}>
                    <div className={styles.titleField}>
                        <TextField
                            id="outlined-textarea"
                            value={title}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                if (e.target.value.length <= 30) {
                                    handleTitle(e);
                                }
                            }}
                            label="レビューの見出しを記入してください。"
                            multiline
                            sx={{  
                                width: '75vw',
                                backgroundColor: 'white',
                            }}
                        />
                    </div>
                    <div className={styles.contentField}>
                        <TextField
                            id="outlined-textarea"
                            value = {content}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                if (e.target.value.length <= 600) {
                                    handleContent(e);
                                }
                            }}
                            label="本文を記入してください。"
                            multiline
                            rows={8}
                            sx={{
                                width: '75vw',
                                backgroundColor: 'white',
                            }}
                        />
                    </div>
                </div>
                <div className={styles.sendButton}>
                    <ReviewCreateSendButton
                        spotId = {spotId}
                        title = {title}
                        setTitle = {setTitle}
                        content = {content}
                        setContent = {setContent}
                        setIsBlank = {setIsBlank}
                    />
                </div>
            </div>
        </div>
    );
}
