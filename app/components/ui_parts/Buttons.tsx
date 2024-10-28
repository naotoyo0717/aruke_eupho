'use client'
import * as React from 'react';
import Button from '@mui/material/Button';
import { useState } from "react";
import useSignupModal from '@/app/hooks/useSignupModal';
import useLoginModal from '@/app/hooks/useLoginModal';
import { signOut } from "next-auth/react";

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
                backgroundColor: '#3BC1FF',     // 背景色
                color: '#FFFFFF',               // テキスト色を白に
                fontWeight: 'bold',
                fontSize: '1.2rem', 
                '&:hover': {
                    backgroundColor: '#35A8E0', // ホバー時の色を設定（任意）
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
                backgroundColor: '#3BC1FF',     // 背景色
                color: '#FFFFFF',               // テキスト色を白に
                fontWeight: 'bold',
                fontSize: '1.2rem', 
                '&:hover': {
                    backgroundColor: '#35A8E0', // ホバー時の色を設定（任意）
                },
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
                width: '13rem',
                height: '4rem',
                borderRadius: '10px',
                backgroundColor: '#3BC1FF',     // 背景色
                color: '#FFFFFF',               // テキスト色を白に
                fontWeight: 'bold',
                fontSize: '1.2rem', 
                '&:hover': {
                    backgroundColor: '#35A8E0', // ホバー時の色を設定（任意）
                },
            }}>
            ログアウト
        </Button>
    );
}

