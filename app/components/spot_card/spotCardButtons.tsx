'use client'

import { Button } from "@mui/material";

interface SelectedSpotButtonProps {
    spotId: number;
    isSelected: boolean;
    setIsSelected: (value: boolean) => void;
    selectedSpotsCounter: number;
    setSelectedSpotsCounter: React.Dispatch<React.SetStateAction<number>>;
    setIsFirstRender: React.Dispatch<React.SetStateAction<boolean>>;
}

export function SelectedSpotButton({ 
    spotId, 
    isSelected, 
    setIsSelected, 
    selectedSpotsCounter, 
    setSelectedSpotsCounter,
    setIsFirstRender,
}: SelectedSpotButtonProps) {

    const toggleSelected = () => {
        if (!isSelected) {
            setSelectedSpotsCounter(selectedSpotsCounter + 1);
            setIsFirstRender(false);
        } else {
            setSelectedSpotsCounter(selectedSpotsCounter - 1);
        }

        setIsSelected(!isSelected);
    };

    const handleClick = async () => {
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