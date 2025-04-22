'use client'

import { Button } from "@mui/material";

interface SelectedSpotButtonProps {
    spotId: number;
    isSelected: boolean;
    setIsSelected: (value: boolean) => void;
    selectedSpotsCounter: number;
    setSelectedSpotsCounter: React.Dispatch<React.SetStateAction<number>>;
    setIsFirstRender: React.Dispatch<React.SetStateAction<boolean>>;
    setNotOpenMap: React.Dispatch<React.SetStateAction<boolean>>;
}

export function SelectedSpotButton({ 
    spotId, 
    isSelected, 
    setIsSelected, 
    selectedSpotsCounter, 
    setSelectedSpotsCounter,
    setIsFirstRender,
    setNotOpenMap,
}: SelectedSpotButtonProps) {

    const toggleSelected = () => {
        if (!isSelected) {
            setSelectedSpotsCounter(selectedSpotsCounter + 1);
            setIsFirstRender(false);
        } else {
            setSelectedSpotsCounter(selectedSpotsCounter - 1);
        }

        setIsSelected(!isSelected);

        if (selectedSpotsCounter <= 25) {
            setNotOpenMap(false);
        }
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
                fontSize: '1rem',
                width: '10vw',
                height: '3rem',
                borderRadius: '7px',
                backgroundColor: isSelected ? '#FF951C' : '#3BC1FF',
                color: '#FFFFFF',
                fontWeight: 'bold',
                '&:hover': {
                    backgroundColor: isSelected ? '#E08718' : '#2FA8E6',
                },
                '@media (max-width: 600px)': {
                    width: '4rem',
                    height: 'auto',
                    fontSize: '0.4rem',
                    minWidth: 'unset',
                    padding: '2px 2px 2px 2px',
                    borderRadius: '2px',
                },
                '@media (min-width: 601px) and (max-width: 834px)': {
                    width: '6rem',
                    height: 'auto',
                    fontSize: '0.7rem',
                    minWidth: 'unset',
                    padding: '2px 2px 2px 2px',
                    borderRadius: '4px',
                },
                '@media (min-width: 834px) and (max-width: 1080px)': {
                    width: '6rem',
                    height: '2rem',
                    fontSize: '0.7rem',
                    minWidth: 'unset',
                    padding: '2px 2px 2px 2px',
                    borderRadius: '4px',
                },
            }}
        >
            {isSelected ? 'ルートから削除' : 'ルートに追加'}
        </Button>
    );
}