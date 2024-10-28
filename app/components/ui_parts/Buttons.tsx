'use client' // ← クライアントコンポーネントであることを宣言

import * as React from 'react';
import Button from '@mui/material/Button';
import { useState } from "react";
import useSignupModal from '@/app/hooks/useSignupModal';
import useLoginModal from '@/app/hooks/useLoginModal';
import { signOut } from "next-auth/react";
//import styles from "@/app/statics/styles/Button.module.css";
//import { useRouter } from 'next/navigation';


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
                width: '10rem',
                height: '3rem',
                borderRadius: '10px'
            }}>
            サインアップ
        </Button>
    );
}

export function LoginButton() {
    const [isOpen, setIsOpen] = useState(false);
    const loginModal = useLoginModal()
    //const router = useRouter();
    return (
        <Button
            variant="contained"
            onClick={() => {
                loginModal.onOpen()
                setIsOpen(!isOpen);
            }}
            sx={{
                width: '10rem',
                heiht: '3rem',
                borderRadius: '10px'
            }}>
            ログイン
        </Button>
    );
}

export function LogoutButton() {
    return (
        <Button
            variant="contained"
            onClick={() => {
                signOut()
            }}
            sx={{
                width: '10rem',
                height: '3ewm',
                borderRadius: '10px'
            }}>
            ログアウト
        </Button>
    );
}

