import { Box, Button, Modal, } from "@mui/material";
import { useState } from "react";
import styles from "@/app/statics/styles/confirmModal.module.css";
import { ModalCloseButton, ReviewCreateSendButton } from "./createReviewButtons";

type ConfirmModalProps = {
    spotId: number;
    title: string;
    setTitle: React.Dispatch<React.SetStateAction<string>>; 
    content: string;
    setContent: React.Dispatch<React.SetStateAction<string>>;
    setIsBlank: React.Dispatch<React.SetStateAction<boolean>>;
} 

export default function ConfirmModal({
    title,
    setTitle,
    content,
    setContent,
    spotId,
    setIsBlank,
}: ConfirmModalProps) {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const handleOpen = () => {
        if (title === "" || content === "") {
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
                            <h2>見出し</h2>
                            {title}
                        </div>
                        <div className={styles.modalContent}>
                            <h2>本文</h2>
                            {content}
                        </div>
                    </div>
                    <div className={styles.modalButtons}>
                        <ModalCloseButton handleClose={handleClose} />
                        <ReviewCreateSendButton
                            spotId={spotId}
                            title={title}
                            setTitle={setTitle}
                            content={content}
                            setContent={setContent}
                            setIsBlank={setIsBlank}
                        />
                    </div>
                </Box>
            </Modal>
        </div>
    );
}
