'use client'

import Checkbox from '@mui/material/Checkbox';
import { useVisitedCounter } from '@/app/context/VisitedCounterContext';

interface CheckBoxProps {
    spotId: number;
    visited: boolean;
    onChange: (visited: boolean) => void;
}

export default function CheckBox({ spotId, visited, onChange }: CheckBoxProps) {
    const { incrementCounter, decrementCounter } = useVisitedCounter();

    const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const isChecked = event.target.checked;
        onChange(isChecked);

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

            if (isChecked) {
                incrementCounter();
            } else {
                decrementCounter();
            }
        } catch (error) {
            console.error('Failed to update visited status:', error);
            onChange(!isChecked);
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
