'use client'

import ExplanationField from "@/app/components/recommendRoute/postRecommend/explanationField";
import RecommendConfirmModal from "@/app/components/recommendRoute/postRecommend/recommendConfirmModal";
import { SelectNearStationButton } from "@/app/components/recommendRoute/postRecommend/selectNearStation";
import TitleField from "@/app/components/recommendRoute/postRecommend/titleField";
import { useState } from "react";

export default function PostRecommend () {
    const [title, setTitle] = useState<string>("");
    const [explanation, setExplanation] = useState<string>("");
    const [nearStation, setNearStation] = useState<number>(0);
    const [isBlank, setIsBlank] = useState<boolean>(true);

    const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };

    const handleExplanation = (e: React.ChangeEvent<HTMLInputElement>) => {
        setExplanation(e.target.value);
    };


    return (
        <div>
            <TitleField
                title = {title}
                handleTitle = {handleTitle}
            />
            <SelectNearStationButton 
                nearStation={nearStation}
                setNearStation={setNearStation}
            />
            <ExplanationField
                explanation = {explanation}
                handleExplanation={handleExplanation}
            />
            <RecommendConfirmModal
                title = {title}
                setTitle= {setTitle}
                explanation = {explanation}
                setExplanation = {setExplanation}
                nearStation = {nearStation}
                setNearStation = {setNearStation}
                setIsBlank = {setIsBlank}
            />
        </div>
    )
}