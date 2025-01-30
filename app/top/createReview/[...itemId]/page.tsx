'use client'

import { useParams } from 'next/navigation';
//import { styles } from '@/app/statics/styles/createReview.module.css';
import ReviewHeader from '@/app/components/review/reviewHeader';
import { ReviewCreateBackButton, ReviewCreateSendButton } from '@/app/components/ui_parts/Buttons';
import { TextField } from '@mui/material';
import { useState } from 'react';

export default function CreateReviewPage() {
    const { itemId } = useParams(); // itemIdを取得 
    const [title, setTitle] = useState<string>("");
    const [content, setContent] = useState<string>("");

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
            <ReviewCreateBackButton
                spotId = {spotId}
            />
            <h1>この場所はどうでしたか？</h1>
            <ReviewHeader spotId={spotId} />
            <TextField
                id="outlined-textarea"
                value = {title}
                onChange = {handleTitle}
                label="レビューのタイトルを記入してください。"
                placeholder="Placeholder"
            />
            <TextField
                id="outlined-textarea"
                value = {content}
                onChange = {handleContent}
                label="本文を記入してください。"
                placeholder="Placeholder"
                multiline
            />
            <ReviewCreateSendButton
                spotId = {spotId}
                title = {title}
                setTitle = {setTitle}
                content = {content}
                setContent = {setContent}
            />
        </div>
    );
}
