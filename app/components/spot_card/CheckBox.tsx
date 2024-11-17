'use client'

import Checkbox from '@mui/material/Checkbox';

interface CheckBoxProps {
    spotId: number;
    visited: boolean;
    onChange: (visited: boolean) => void;
}

export default function CheckBox({ spotId, visited, onChange }: CheckBoxProps) {
    const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const isChecked = event.target.checked;

        // まず親コンポーネントに状態を更新
        onChange(isChecked);

        console.log('Sending data:', { spotId, visited: isChecked });

        try {
            const response = await fetch('/api/updateVisited', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    spotId: spotId,
                    visited: isChecked,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to update visited status');
            }
        } catch (error) {
            // APIリクエストが失敗した場合、親の状態を元に戻す
            console.error('Failed to update visited status:', error);
            // 親の状態を元に戻す処理を加えたほうがよい
            onChange(visited);  // 状態を元に戻す
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
