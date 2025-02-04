import { TextField } from "@mui/material";

type titleFieldProps = {
    title: string;
    handleTitle: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function TitleField ({title, handleTitle}: titleFieldProps) {
    return (
        <TextField
            id="outlined-textarea"
            value = {title}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                if (e.target.value.length <= 30) {
                    handleTitle(e);
                }
            }}
            label="レビューの見出しを記入してください。（30文字以内）"
            multiline
            sx={{
                width: '75vw',
                backgroundColor: 'white',
            }}
        />
    );
}