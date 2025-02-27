import { TextField } from "@mui/material";

type EmailFieldProps = {
    email: string;
    handleEmail: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function EmailField ({email, handleEmail}: EmailFieldProps) {
    return (
        <TextField
            id="outlined-textarea"
            value = {email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                if (e.target.value.length <= 255) {
                    handleEmail(e);
                }
            }}
            label="メールアドレスを記入してください。"
            multiline
            rows={1}
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