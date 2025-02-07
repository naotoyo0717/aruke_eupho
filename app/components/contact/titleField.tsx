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
            label="件名を記入してください。"
            multiline
            sx={{
                width: '75vw',
                backgroundColor: 'white',
            }}
        />
    );
}