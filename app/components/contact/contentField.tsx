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
                if (e.target.value.length <= 600) {
                    handleContent(e);
                }
            }}
            label="問い合わせ内容を記入してください。"
            multiline
            rows={8}
            sx={{
                width: '75vw',
                backgroundColor: 'white',
            }}
        />
    );
}