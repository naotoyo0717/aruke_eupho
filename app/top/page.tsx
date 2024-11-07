'use client'

import SpotCard from "@/app/components/spot_card/SpotCard";
import { useState } from "react";

export default function top () {

    const [isSelected, setIsSelected] = useState<boolean>(false);
    
    return (
        <>
            <h1>トップページ</h1>
            <SpotCard isSelected={isSelected} setIsSelected={setIsSelected} />
        </>
    )
}