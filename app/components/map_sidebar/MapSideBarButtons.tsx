'use client'

import { Button } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export function MapSideBarBackButton() {
    return (
        <Button
            href="/top"
            variant='contained'
            sx={{
                width: '10rem',
                height: '3rem',
                borderRadius: '10px',
                backgroundColor: '#3BC1FF',
                color: '#FFFFFF',
                fontWeight: 'bold',
                fontSize: '1.2rem', 
                '&:hover': {
                    backgroundColor: '#35A8E0',
                },
            }}>
            <ArrowBackIcon/>
            選択に戻る
        </Button>
    );
}
