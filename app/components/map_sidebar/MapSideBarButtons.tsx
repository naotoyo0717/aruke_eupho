'use client'

import { Button } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export function MapSideBarBackButton() {
    return (
        <Button
            href="/top"
            variant='contained'
            sx={{
                width: '12vw',
                height: '3rem',
                borderRadius: '10px',
                backgroundColor: '#3BC1FF',
                color: '#FFFFFF',
                fontWeight: 'bold',
                fontSize: '1.3vw', 
                '&:hover': {
                    backgroundColor: '#35A8E0',
                },
                '@media (max-width: 600px)': {
                    width: '23vw',
                    height: 'auto',
                    fontSize: '3vw',
                    minWidth: 'unset',
                    padding: '2px 2px 2px 2px',
                    borderRadius: '6px',
                },
            }}>
            <ArrowBackIcon
                sx={{
                    '@media (max-width: 600px)': {
                        fontSize: '3vw',
                    },
                }}
            />
            選択に戻る
        </Button>
    );
}
