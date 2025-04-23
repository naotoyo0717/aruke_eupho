'use client'

import { useEffect, useState } from "react";
import SpotCard from "@/app/components/spot_card/SpotCard";
import Loading from "../loading";
import { VisitedCounter } from "../components/ui_parts/VisitedCounter";
import styles from "@/app/statics/styles/topButtons.module.css";
import { SpotType } from "../types";
import { fetchSelected, fetchSpots, fetchVisited } from "../actions/topActions";
import { FilterSpotButton, IsUserLocationButton, OpenMapButton, ResetSelectionButton, SelectStartingButton } from "../components/top/topButtons";
import { Comp } from "../components/ui_parts/goTopButton";
import SelectedCounter from "../components/ui_parts/selectedCounter";

export default function Top() {
    const [spots, setSpots] = useState<SpotType[]>([]);
    const [visited, setVisited] = useState<{ spotId: number }[]>([]);
    const [selectedSpots, setSelectedSpots] = useState<{ [key: number]: boolean }>({});
    const [isUserLocation, setIsUserLocation] = useState<boolean>(false);
    const [visitedCounter, setVisitedCounter] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [startingPoint, setStartingPoint] = useState<number>(1);
    const [selectedSpotsCounter, setSelectedSpotsCounter] = useState<number>(0);
    const [isFirstRender, setIsFirstRender] = useState<boolean>(false); // 初回表示フラグ
    const [notOpenMap, setNotOpenMap] = useState<boolean>(false);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const fetchedSpots = await fetchSpots();
                if (fetchedSpots) {
                    setSpots(fetchedSpots);
                }
                const fetchedVisited = await fetchVisited();
                if (fetchedVisited) {
                    setVisited(fetchedVisited);
                    setVisitedCounter(fetchedVisited.length);
                }
                const fetchedSelected = await fetchSelected();
                if (fetchedSelected) {
                    setSelectedSpots(fetchedSelected);
                    setSelectedSpotsCounter(Object.keys(fetchedSelected).length);
                }
                await Promise.all([fetchVisited(), fetchSelected()]);
                sessionStorage.setItem("previousPage", "/top");
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

    const handleVisitedChange = (id: number, newVisited: boolean) => {
        setVisited((prevVisited) => {
            const isAlreadyVisited = prevVisited.some((spot) => spot.spotId === id);
            if (newVisited && !isAlreadyVisited) {
                const updatedVisited = [...prevVisited, { spotId: id }];
                setVisitedCounter(updatedVisited.length);
                return updatedVisited;
            } else if (!newVisited && isAlreadyVisited) {
                const updatedVisited = prevVisited.filter((spot) => spot.spotId !== id);
                setVisitedCounter(updatedVisited.length);
                return updatedVisited;
            }
            return prevVisited;
        });
    };

    return (
        <>
            <div className={styles.topButtons}>
                <div className={styles.filterButtons}>
                    <ResetSelectionButton />
                    <div className={styles.isUserLocationButton}>
                        <IsUserLocationButton
                            isUserLocation={isUserLocation}
                            setIsUserLocation={setIsUserLocation}
                        />
                    </div>
                    <div className={styles.filterSpotButton}>
                        <FilterSpotButton setSpots={setSpots} />
                    </div>
                    <div className={styles.selectStartingButton}>
                        <SelectStartingButton
                            startingPoint={startingPoint}
                            setStartingPoint={setStartingPoint}
                        />
                    </div>
                </div>
                <div className={styles.visitedCounter}>
                    <div>
                        <SelectedCounter selectedSpotsCounter={selectedSpotsCounter}/>
                    </div>
                    <div>
                        <VisitedCounter visitedCounter={visitedCounter} />
                    </div>
                </div>
            </div>
            <div className={styles.topButtonsContent}>
                <h2>巡礼したい場所をルートに追加してください。</h2>
                <OpenMapButton
                    startingPoint={startingPoint}
                    selectedSpots={selectedSpots}
                    selectedSpotsCounter={selectedSpotsCounter}
                    setIsFirstRender={setIsFirstRender}
                    isUserLocation={isUserLocation}
                    setNotOpenMap={setNotOpenMap}
                />
            </div>
            {isFirstRender === false || selectedSpotsCounter === 0 && ( // エラーメッセージの条件付き表示
                <div className={styles.errorMessage}>
                    <p>スポットは一つ以上選択してください。</p>
                </div>
            )}
            {notOpenMap &&
                <div className={styles.errorMessage}>
                    <p>選択できるスポットは25個までです。</p>
                </div>
            }
            {isLoading ? (
                <Loading />
            ) : (
                spots.map((item) => {
                    const isVisited = visited.some((v) => v.spotId === item.id);
                    const isSelected = !!selectedSpots[item.id];
                    return (
                        <SpotCard
                            key={item.id}
                            isSelected={isSelected}
                            setIsSelected={() =>
                                setSelectedSpots((prevState) => ({
                                    ...prevState,
                                    [item.id]: !prevState[item.id],
                                }))
                            }
                            item={item}
                            visited={isVisited}
                            onVisitedChange={handleVisitedChange}
                            selectedSpots={selectedSpots}
                            selectedSpotsCounter={selectedSpotsCounter}
                            setSelectedSpotsCounter={setSelectedSpotsCounter}
                            setIsFirstRender={setIsFirstRender}
                            setNotOpenMap={setNotOpenMap}
                        />
                    );
                })
            )}
            <div className={styles.topBottom}>
                <OpenMapButton
                    startingPoint={startingPoint}
                    selectedSpots={selectedSpots}
                    selectedSpotsCounter={selectedSpotsCounter}
                    setIsFirstRender={setIsFirstRender}
                    isUserLocation={isUserLocation}
                    setNotOpenMap={setNotOpenMap}
                />
            </div>
            <Comp />
        </>
    );
}
