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
                }
            }}
        >
            <ArrowBackIcon/>
            戻る
        </Button>
    )
}