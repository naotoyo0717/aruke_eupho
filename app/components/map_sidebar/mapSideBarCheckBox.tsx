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
            onVisitedChange(!isChecked);
        }
    };

    return (
        <Checkbox
            checked={isSideBarVisited}
            onChange={handleChange}
            sx={{
                '& .MuiSvgIcon-root': { fontSize: '2vw' },
                '&.Mui-checked': {
                    color: '#FF951C',
                },
                '@media (max-width: 600px)': {
                    '& .MuiSvgIcon-root': { fontSize: '4vw' },
                },
            }}
        />
    );
}
