import { fetchPostContact } from "@/app/actions/contactActions";
import { Button } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

type ContactSendButtonProps = {
    email: string;
    setEmail: React.Dispatch<React.SetStateAction<string>>;
    title: string;
    setTitle: React.Dispatch<React.SetStateAction<string>>;
    content: string;
    setContent: React.Dispatch<React.SetStateAction<string>>;
    setIsBlank: React.Dispatch<React.SetStateAction<boolean>>;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}


export function ContactSendButton({ email, setEmail, title, setTitle, content, setContent, setIsBlank, setIsOpen }: ContactSendButtonProps) {

    const handleClick = async () => {
        console.log("送信");
        console.log(`メールアドレス:${email}`);
        console.log(`タイトル:${title}`);
        console.log(`コンテント:${content}`);

        if (email == "" || title == "" || content == "") {
            setIsBlank(true);
        } else {
            try {
                const fetchedPostContact = await fetchPostContact(email, title, content);
                if (fetchedPostContact) {
                    console.log("成功");
                    toast.success("送信しました！！")
                    setIsOpen(false);
                    setEmail("");
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
                '@media (max-width: 600px)': {
                    width: '5rem',
                    height: '1.8rem',
                    fontSize: '1rem',
                    borderRadius: "5px",
                    padding: '2px 2px',
                    minWidth: 'unset',
                },
            }}
        >
            はい
        </Button>
    )
}



type ContactModalCloseButtonProps = {
    handleClose: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export function ContantModalCloseButton( {handleClose}: ContactModalCloseButtonProps) {
    return (
        <Button
            variant="contained"
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
                '@media (max-width: 600px)': {
                    width: '5rem',
                    height: '1.8rem',
                    fontSize: '1rem',
                    borderRadius: "5px",
                    padding: '2px 2px',
                    minWidth: 'unset',
                },
            }}
        >
            いいえ
        </Button>
    )
}


export function ContactBackButton() {
    const router = useRouter();
    const handleClick = () => {
        router.push(`/top`);
    };
    return (
        <Button
            onClick = {handleClick}
            sx={{
                display: "flex",
                alignItems: "center",
                fontSize: "1.7rem", // 文字を大きく
                fontWeight: "bold",
                color: "#443322", // 文字色を青系に変更（お好みで）
                "& .MuiSvgIcon-root": {
                    fontSize: "2.7rem", // アイコンのサイズを大きく
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