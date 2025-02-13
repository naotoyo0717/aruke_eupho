'use client'

import { fetchCreateReview } from "@/app/actions/reviewActions";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

type ReviewCreateBackButtonProps = {
    spotId: number;
};

export function ReviewCreateBackButton({ spotId }: ReviewCreateBackButtonProps) {
    const router = useRouter();
    const handleClick = () => {
        router.push(`/top/showReview/${spotId}`);
    };
    return (
        <Button
            onClick = {handleClick}
            sx={{
                display: "flex",
                alignItems: "center",
                fontSize: "1.7rem",
                fontWeight: "bold",
                color: "#443322",
                "& .MuiSvgIcon-root": {
                    fontSize: "2.7rem",
                    fontWeight: "bold"
                }
            }}
        >
            <ArrowBackIcon/>
            戻る
        </Button>
    )
}


type ReviewCreateSendButtonProps = {
    spotId: number;
    title: string;
    setTitle: React.Dispatch<React.SetStateAction<string>>; 
    content: string;
    setContent: React.Dispatch<React.SetStateAction<string>>;
    setIsBlank: React.Dispatch<React.SetStateAction<boolean>>;
}

export function ReviewCreateSendButton({ title, setTitle, content, setContent, spotId, setIsBlank }: ReviewCreateSendButtonProps) {
    const router = useRouter();
    const handleClick = async () => {
        console.log("送信");
        console.log(`スポットID:${spotId}`);
        console.log(`タイトル:${title}`);
        console.log(`コンテント:${content}`);

        if (title == "" || content == "") {
            setIsBlank(true);
        } else {
            try {
                const fetchedCreateReview = await fetchCreateReview(title, content, spotId);
                if (fetchedCreateReview) {
                    console.log("成功");
                    toast.success("投稿しました！！")
                    router.push(`/top/showReview/${spotId}`)
                    setTitle("");
                    setContent("");
                } else {
                    throw new Error('createReviewが失敗しました。');
                }
            } catch (error) {
                console.error('createReviewに失敗しました。',error);
                toast.error("エラーが発生しました。")
            }
        }
    }

    return (
        <Button
            variant="contained"
            onClick={handleClick}
            sx={{
                width: "9rem",
                height: "3rem",
                borderRadius: "10px",
                backgroundColor: "#3BC1FF",
                color: "#FFFFFF",
                fontWeight: "bold",
                fontSize: "1.2rem",
                "&:hover": {
                    backgroundColor: "#35A8E0",
                },
            }}
        >
            はい
        </Button>
    )
}



type ModalCloseButtonProps = {
    handleClose: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export function ModalCloseButton( {handleClose}: ModalCloseButtonProps) {
    return (
        <Button
            onClick={handleClose}
            sx = {{
                width: "9rem",
                height: "3rem",
                borderRadius: "10px",
                backgroundColor: "#3BC1FF",
                color: "#FFFFFF",
                fontWeight: "bold",
                fontSize: "1.2rem",
                "&:hover": {
                    backgroundColor: "#35A8E0",
                },
            }}
        >
            いいえ
        </Button>
    )
}

