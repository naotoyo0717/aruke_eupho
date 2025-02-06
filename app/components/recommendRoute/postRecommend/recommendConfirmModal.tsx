import { Box, Button, Modal,} from "@mui/material";
import { useState } from "react";
import { ModalCloseButton, RecommendRouteSendButton, ReviewCreateSendButton } from "../../ui_parts/Buttons";
import styles from "@/app/statics/styles/confirmModal.module.css";

type RecommendConfirmModalProps = {
    title: string;
    setTitle: React.Dispatch<React.SetStateAction<string>>; 
    explanation: string;
    setExplanation: React.Dispatch<React.SetStateAction<string>>;
    nearStation: number;
    setNearStation: React.Dispatch<React.SetStateAction<number>>;
    setIsBlank: React.Dispatch<React.SetStateAction<boolean>>;
} 

export default function RecommendConfirmModal({
    title,
    setTitle,
    explanation,
    setExplanation,
    nearStation,
    setNearStation,
    setIsBlank,
}: RecommendConfirmModalProps) {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const handleOpen = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (title === "" || explanation === "") {
            setIsBlank(true);
            return; // フォームが未記入の場合、モーダルを開かない
        }

        // フォームが記入されていればモーダルを開く
        setIsBlank(false);
        setIsOpen(true);
    };

    const handleClose = () => {
        setIsOpen(false);
    };

    return (
        <div>
            <div>
                <Button
                    variant="contained"
                    onClick={handleOpen}
                    sx = {{
                        width: "9rem",
                        height: "3rem",
                        borderRadius: "10px",
                        color: "#FFFFFF",
                        backgroundColor: "#3BC1FF",
                        fontWeight: "bold",
                        fontSize: "1.2rem",
                        "&:hover": {
                            backgroundColor: "#35A8E0",
                        },
                    }}
                >
                    投稿
                </Button>
            </div>
            <Modal
                open={isOpen}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        bgcolor: "#E6F7FF",
                        boxShadow: 24,
                        p: 4,
                        borderRadius: 4,
                        minWidth: 300,
                        width: '80vw',
                        maxHeight: '90vh',
                    }}
                >
                    <div className={styles.modalHeader}>
                        この内容で投稿しますか？
                    </div>
                    <div className={styles.scrollable}>
                        <div className={styles.modalTitle}>
                            <h2>タイトル</h2>
                            {title}
                        </div>
                        <div className={styles.modalContent}>
                            <h2>説明</h2>
                            {explanation}
                        </div>
                    </div>
                    <div className={styles.modalButtons}>
                        <ModalCloseButton handleClose={handleClose} />
                        <RecommendRouteSendButton
                            title = {title}
                            setTitle = {setTitle}
                            explanation = {explanation}
                            setExplanation={setExplanation}
                            nearStation = {nearStation}
                            setNearStation = {setNearStation}
                            setIsBlank = {setIsBlank}
                        />
                    </div>
                </Box>
            </Modal>
        </div>
    );
}
