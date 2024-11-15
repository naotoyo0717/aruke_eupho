'use client'

import Checkbox from '@mui/material/Checkbox';

interface CheckBoxProps {
    spotId: number;
    userId: string;
    visited: boolean;
    onChange: (visited: boolean) => void;
}

export default function CheckBox({ spotId, userId, visited, onChange }: CheckBoxProps) {
    const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const isChecked = event.target.checked;

        // 親コンポーネントに状態を更新
        onChange(isChecked);

        console.log('Sending data:', { userId, spotId, visited: isChecked }); // 修正点

        try {
            const response = await fetch('/api/updateVisited', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: userId,
                    spotId: spotId,
                    visited: isChecked,
                }),
            });

            if (!response.ok) {
                console.error('Failed to update visited status');
            }
        } catch (error) {
            console.error('Failed to update visited status:', error);
        }
    };

    return (
        <Checkbox
            checked={visited}
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
