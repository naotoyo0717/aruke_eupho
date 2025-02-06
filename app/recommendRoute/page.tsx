'use client'

import { useEffect, useState } from "react";
import { fetchSelected, fetchSpots } from "../actions/topActions";
import { SpotType } from "../types";
import styles from "@/app/statics/styles/topButtons.module.css";
import { ConfirmMapButton, FilterSpotButton, ResetSelectionButton, SelectStartingButton } from "../components/ui_parts/Buttons";
import Loading from "../loading";
import ReccomendSpotCard from "../components/recommendRoute/recommendSpotCard";

export default function ReccomendRoute () {
    const [spots, setSpots] = useState<SpotType[]>([]);
    const [selectedSpotsCounter, setSelectedSpotsCounter] = useState<number>(0);
    const [selectedSpots, setSelectedSpots] = useState<{ [key: number]: boolean }>({});
    const [startingPoint, setStartingPoint] = useState<number>(1);
    const [thumbnail, setThumbnail] = useState<number>(1);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isFirstRender, setIsFirstRender] = useState<boolean>(true); // 初回表示フラグ

    useEffect(() => {
            const fetchData = async () => {
                try {
                    const fetchedSpots = await fetchSpots();
                    if (fetchedSpots) {
                        setSpots(fetchedSpots);
                    }
                    const fetchedSelected = await fetchSelected();
                    if (fetchedSelected) {
                        setSelectedSpots(fetchedSelected);
                        setSelectedSpotsCounter(Object.keys(fetchedSelected).length);
                    }
                    await Promise.all([fetchSelected()]);
                    setIsLoading(false);
                    setIsFirstRender(false); // 初回表示が終わった後にフラグを更新
                } catch (error) {
                    console.error('Error during data fetching:', error);
                    setIsLoading(false);
                    setIsFirstRender(false); // エラー時もフラグを更新
                }
            };
    
            fetchData();
        }, []);

    return (
        <div>
            <div className={styles.topButtons}>
                <div className={styles.filterButtons}>
                    <ResetSelectionButton />
                    <FilterSpotButton setSpots={setSpots} />
                    <SelectStartingButton
                        startingPoint={startingPoint}
                        setStartingPoint={setStartingPoint}
                    />
                </div>
            </div>
            <div className={styles.topButtonsContent}>
                <h2>おすすめルートに追加してください。</h2>
                <p>{JSON.stringify(selectedSpots)}</p>
                <ConfirmMapButton
                    startingPoint={startingPoint}
                    selectedSpots={selectedSpots}
                    selectedSpotsCounter={selectedSpotsCounter}
                    setIsFirstRender={setIsFirstRender}
                />
            </div>
            {isFirstRender === false && selectedSpotsCounter === 0 && ( // エラーメッセージの条件付き表示
                <div className={styles.errorMessage}>
                    <p>スポットは一つ以上選択してください。</p>
                </div>
            )}
            {isLoading ? (
                <Loading />
            ) : (
                spots.map((item) => {
                    const isSelected = !!selectedSpots[item.id];
                    return (
                        <ReccomendSpotCard
                            key={item.id}
                            isSelected={isSelected}
                            setIsSelected={() =>
                                setSelectedSpots((prevState) => ({
                                    ...prevState,
                                    [item.id]: !prevState[item.id],
                                }))
                            }
                            item={item}
                            selectedSpots={selectedSpots}
                            selectedSpotsCounter={selectedSpotsCounter}
                            setSelectedSpotsCounter={setSelectedSpotsCounter}
                        />
                    );
                })
            )}
            <div className={styles.topBottom}>
                <ConfirmMapButton
                    startingPoint={startingPoint}
                    selectedSpots={selectedSpots}
                    selectedSpotsCounter={selectedSpotsCounter}
                    setIsFirstRender={setIsFirstRender}
                />
            </div>
        </div>
    )
}