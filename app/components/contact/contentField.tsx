import { TextField } from "@mui/material";

type ContentFieldProps = {
    content: string;
    handleContent: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function TitleField ({content, handleContent}: ContentFieldProps) {
    return (
        <TextField
            id="outlined-textarea"
            value = {content}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                if (e.target.value.length <= 1000) {
                    handleContent(e);
                }
            }}
            label="本文を記入してください。(1000文字以内)"
            multiline
            rows={8}
            slotProps={{
                inputLabel: { shrink: true } // これを使う
            }}
            sx={{
                width: '75vw',
                backgroundColor: 'white',
                '@media (max-width: 600px)': {
                        width: '90vw',
                    },
            }}
        />
    );
}