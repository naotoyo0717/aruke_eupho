'use client'

import Checkbox from '@mui/material/Checkbox';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

export default function CheckBox() {
    return(
        <div>
            <Checkbox
                {...label}
                defaultChecked
                sx={{
                    '& .MuiSvgIcon-root': { fontSize: 40 },
                    '&.Mui-checked': {
                        color: '#FF951C',
                    },
                }}
            />
        </div>
    )
}