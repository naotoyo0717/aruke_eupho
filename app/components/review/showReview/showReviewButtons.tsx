import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Button } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export function ReviewBackButton() {
    const router = useRouter();

    const [previousPage, setPreviousPage] = useState<string | null>(null);

    useEffect(() => {
        // 遷移元のページを sessionStorage に保存
        const referrer = sessionStorage.getItem("previousPage");
        if (referrer) {
        setPreviousPage(referrer);
        }
    }, []);

    const handleClick = () => {
        if (previousPage === "/allMap") {
            window.location.href = "/allMap";
          } else {
            router.push("/top");
          }
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
                },
                '@media (max-width: 600px)': {
                    width: '10vw',
                    height: 'auto',
                    fontSize: '2.5vw',
                    minWidth: 'unset',
                    padding: '2px 2px 2px 2px',
                    borderRadius: '2px',
                },
            }}
        >
            <ArrowBackIcon
                sx={{
                    width: '2vw',
                    '@media (max-width: 600px)': {
                        width: '3.5vw',
                    },
                }}    
            />
            戻る
        </Button>
    )
}



type PushCreatePageButtonProps = {
    spotId: number;
}

export function PushCreatePageButton({ spotId }: PushCreatePageButtonProps) {
    const router = useRouter();
    const handleClick = () => {
        router.push(`/top/createReview/${spotId}`);
    };

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
                '@media (max-width: 600px)': {
                    width: '3.2rem',
                    height: 'auto',
                    fontSize: '0.6rem',
                    minWidth: 'unset',
                    padding: '2px 2px 2px 2px',
                    borderRadius: '2px',
                },
            }}
        >
            投稿する
        </Button>
    )

}