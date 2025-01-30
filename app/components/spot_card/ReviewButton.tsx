'use client'

import Link from 'next/link'; // Linkコンポーネントをインポート
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';

interface ReviewButtonProps {
    itemId: number;
}

export default function ReviewButton({ itemId }: ReviewButtonProps) {
    return (
        <Link href={`/top/showReview/${itemId}`} passHref>
            <button>
                <ChatBubbleOutlineIcon
                    sx={{
                        color: '#443322',
                        opacity: 0.8,
                        width: '3rem',
                        height: '2.5rem',
                        '&:hover': {
                            color: '#3BC1FF',
                            opacity: 5,
                        },
                    }} />
            </button>
        </Link>
    );
}
