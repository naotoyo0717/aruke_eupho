'use client'

import useLoginModal from "@/app/hooks/useLoginModal";
import useSignupModal from "@/app/hooks/useSignupModal";
import { Button } from "@mui/material";
import { signOut } from "next-auth/react";
import { useState } from "react";

export function SignupButton() {
    const [isOpen, setIsOpen] = useState(false);
    const signupModal = useSignupModal();
    return (
        <Button
            variant="contained"
            onClick={() => {
                signupModal.onOpen();
                setIsOpen(!isOpen);
            }}
            sx={{
                width: '13rem',
                height: '4rem',
                borderRadius: '10px',
                backgroundColor: '#3BC1FF',
                color: '#FFFFFF',
                fontWeight: 'bold',
                fontSize: '1.2rem', 
                '&:hover': {
                    backgroundColor: '#35A8E0',
                },
                '@media (max-width: 600px)': {
                    width: '10rem',
                    height: '3rem',
                    fontSize: '1rem',
                },
            }}>
            サインアップ
        </Button>
    );
}



export function LoginButton() {
    const [isOpen, setIsOpen] = useState(false);
    const loginModal = useLoginModal()
    return (
        <Button
            variant="contained"
            onClick={() => {
                loginModal.onOpen()
                setIsOpen(!isOpen);
            }}
            sx={{
                width: '13rem',
                heiht: '4rem',
                borderRadius: '10px',
                backgroundColor: '#3BC1FF',
                color: '#FFFFFF',
                fontWeight: 'bold',
                fontSize: '1.2rem', 
                '&:hover': {
                    backgroundColor: '#35A8E0',
                },
                '@media (max-width: 600px)': {
                    width: '10rem',
                    height: '3rem',
                    fontSize: '1rem',
                },
            }}>
            ログイン
        </Button>
    );
}



export function LogoutButton() {

    const handleLogout = async () => {
        // ローカルストレージを削除
        localStorage.removeItem("reloaded");

        await signOut();
    };

    return (
        <Button
            variant="contained"
            onClick={handleLogout}
            sx={{
                width: '13rem',
                height: '4rem',
                borderRadius: '10px',
                backgroundColor: '#3BC1FF',
                color: '#FFFFFF',
                fontWeight: 'bold',
                fontSize: '1.2rem', 
                '&:hover': {
                    backgroundColor: '#35A8E0',
                },
                '@media (max-width: 600px)': {
                    width: '10rem',
                    height: '3rem',
                    fontSize: '1rem',
                },
            }}>
            ログアウト
        </Button>
    );
}