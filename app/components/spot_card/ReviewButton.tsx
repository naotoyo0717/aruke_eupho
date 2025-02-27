'use client'

//import Link from 'next/link'; // Linkコンポーネントをインポート
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
//import { Button } from '@mui/material';
import { useRouter } from 'next/navigation';

interface ReviewButtonProps {
    itemId: number;
}

export default function ReviewButton({ itemId }: ReviewButtonProps) {
    const router = useRouter();
    const handleClick = () => {
        router.push(`/top/showReview/${itemId}`);
    }

    return (
            <button
                onClick={handleClick}
            >
                <ChatBubbleOutlineIcon
                    sx={{
                        color: '#443322',
                        opacity: 0.8,
                        width: '2.7vw',
                        height: 'auto',
                        '&:hover': {
                            color: '#3BC1FF',
                            opacity: 1,
                        },
                        '@media (max-width: 600px)': {
                            width: '4vw'
                        },
                    }} />
            </button>
    );
}
