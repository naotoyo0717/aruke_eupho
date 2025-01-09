'use client'

import { useEffect, useState } from "react";
import SpotCard from "@/app/components/spot_card/SpotCard";
import Loading from "../loading";
import { VisitedCounter } from "../components/ui_parts/VisitedCounter";
import { FilterSpotButton, IsUserLocationButton, OpenMapButton, ResetSelectionButton, SelectStartingButton } from "../components/ui_parts/Buttons";
import styles from "@/app/statics/styles/topButtons.module.css";
import { SpotType } from "../types";

export default function Top() {
    const [spots, setSpots] = useState<SpotType[]>([]);
    const [visited, setVisited] = useState<{ spotId: number }[]>([]);
    const [selectedSpots, setSelectedSpots] = useState<{ [key: number]: boolean }>({});
    const [isUserLocation, setIsUserLocation] = useState<boolean>(false);
    const [visitedCounter, setVisitedCounter] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [startingPoint, setStartingPoint] = useState<number>(1);
    const [selectedSpotsCounter, setSelectedSpotsCounter] = useState<number>(0);
    const [isFirstRender, setIsFirstRender] = useState<boolean>(true); // 初回表示フラグ

    useEffect(() => {
        const fetchSpots = async () => {
            try {
                const response = await fetch('/api/getSpots', { method: 'GET' });
                if (!response.ok) {
                    throw new Error('Failed to fetch spots');
                }
                const data: SpotType[] = await response.json();
                setSpots(data);
            } catch (error) {
                console.error('Error fetching spots:', error);
            }
        };

        const fetchVisited = async () => {
            try {
                const response = await fetch('/api/searchVisited', { method: 'GET' });
                if (!response.ok) {
                    throw new Error('Failed to search visited');
                }
                const data: { spotId: number }[] = await response.json();
                setVisited(data);
                setVisitedCounter(data.length);
            } catch (error) {
                console.error('Error searching visited:', error);
            }
        };

        const fetchSelected = async () => {
            try {
                const response = await fetch('/api/searchSelected', { method: 'GET' });
                if (!response.ok) {
                    throw new Error('Failed to search selected');
                }
                const data: { spotId: number }[] = await response.json();
                console.log(data);

                const formattedData = data.reduce((acc, item) => {
                    acc[item.spotId] = true;
                    return acc;
                }, {} as { [key: number]: boolean });

                setSelectedSpots(formattedData);
                setSelectedSpotsCounter(Object.keys(formattedData).length);
            } catch (error) {
                console.log('Error searching selected:', error);
            }
        };

        const fetchData = async () => {
            try {
                await Promise.all([fetchSpots(), fetchVisited(), fetchSelected()]);
                setIsLoading(false);
                //setIsFirstRender(false); // 初回表示が終わった後にフラグを更新
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
                    <IsUserLocationButton isUserLocation={isUserLocation} setIsUserLocation={setIsUserLocation}/>
                    <FilterSpotButton setSpots={setSpots} />
                    <SelectStartingButton
                        startingPoint={startingPoint}
                        setStartingPoint={setStartingPoint}
                    />
                </div>
                <VisitedCounter visitedCounter={visitedCounter} />
            </div>
            <div className={styles.topButtonsContent}>
                <h2>巡礼したい場所をルートに追加してください。</h2>
                <OpenMapButton
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
                />
            </div>
        </>
    );
}
