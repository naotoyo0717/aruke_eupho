'use client'

import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';

export default function CommentButton() {
    return(
        <button>
            <ChatBubbleOutlineIcon
                sx={{
                    color: '#443322',
                    opacity: 0.8,
                    width: '3rem',
                    height: '2.5rem',
                }}/>
        </button>
    )
}
