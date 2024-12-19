'use client';

import { Checkbox } from "@mui/material";

interface MapSideBarCheckBoxProps {
    spotId: number;
    isSideBarVisited: boolean;
    onVisitedChange: (visited: boolean) => void;
}

export default function MapSideBarCheckBox({ spotId, isSideBarVisited, onVisitedChange }: MapSideBarCheckBoxProps) {
    const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const isChecked = event.target.checked;

        // 一時的に状態を変更
        onVisitedChange(isChecked);

        try {
            const response = await fetch('/api/updateVisited', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    spotId,
                    visited: isChecked,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to update visited status');
            }
        } catch (error) {
            console.error('Error updating visited status:', error);
            // API エラー時に状態を元に戻す
            onVisitedChange(!isChecked);
        }
    };

    return (
        <Checkbox
            checked={isSideBarVisited}
            onChange={handleChange}
            sx={{
                '& .MuiSvgIcon-root': { fontSize: 40 },
                '&.Mui-checked': {
                    color: '#FF951C',
                },
            }}
        />
    );
}
