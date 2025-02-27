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
        // <Link href={`/top/showReview/${itemId}`} passHref>
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
                            opacity: 5,
                        },
                        '@media (max-width: 600px)': {
                            width: '4vw'
                        },
                    }} />
            </button>
        // </Link>
    );
}
