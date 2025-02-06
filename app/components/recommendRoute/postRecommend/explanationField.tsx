import { TextField } from "@mui/material";

type ExplanationFieldProps = {
    explanation: string;
    handleExplanation: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function ExplanationField ({explanation, handleExplanation}: ExplanationFieldProps) {
    return (
        <TextField
            id="outlined-textarea"
            value = {explanation}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                if (e.target.value.length <= 600) {
                    handleExplanation(e);
                }
            }}
            label="本文を記入してください。(600文字以内）"
            multiline
            rows={8}
            sx={{
                width: '75vw',
                backgroundColor: 'white',
            }}
        />
    );
}