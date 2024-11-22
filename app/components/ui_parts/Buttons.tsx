'use client'
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
                backgroundColor: '#3BC1FF',
                color: '#FFFFFF',
                fontWeight: 'bold',
                fontSize: '1.2rem', 
                '&:hover': {
                    backgroundColor: '#35A8E0',
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
                backgroundColor: '#3BC1FF',
                color: '#FFFFFF',
                fontWeight: 'bold',
                fontSize: '1.2rem', 
                '&:hover': {
                    backgroundColor: '#35A8E0',
                },
            }}>
            ログアウト
        </Button>
    );
}

interface SelectedSpotButtonProps {
    spotId: number;
    isSelected: boolean;
    setIsSelected: (value: boolean) => void;
}

export function SelectedSpotButton({ spotId, isSelected, setIsSelected,}: SelectedSpotButtonProps) {

    const toggleSelected = () => {
        setIsSelected(!isSelected);
    }
    const handleClick = async () => { // 修正済み

        try {
            const response = await fetch('/api/updateSelected', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    spotId: spotId,
                    selected: isSelected,
                }),
            });
            
            if (!response.ok) {
                throw new Error('selectedの更新に失敗しました。');
            }
        } catch (error) {
            console.error('selectedの更新に失敗しました。', error);
        }
        toggleSelected();
    };

    return (
        <Button
            variant="contained"
            onClick={handleClick}
            sx={{
                width: '10rem',
                height: '3rem',
                borderRadius: '10px',
                backgroundColor: isSelected ? '#FF951C' : '#3BC1FF',
                color: '#FFFFFF',
                fontWeight: 'bold',
                fontSize: '1rem',
                '&:hover': {
                    backgroundColor: isSelected ? '#E08718' : '#2FA8E6',
                },
            }}
        >
            {isSelected ? 'ルートから削除' : 'ルートに追加'}
        </Button>
    );
}