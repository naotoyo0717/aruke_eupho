import { useEffect, useState } from "react";
import styles from "@/app/statics/styles/mapSideBar.module.css";
import { SpotLocationType } from "@/app/types";
import MapSideBarCard from "./mapSideBarCard";
import { Button } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import { MapSideBarBackButton } from "./MapSideBarButtons";

interface MapSideBarProps {
    origin: string;
    duration: string;
    selectedWayPoints: SpotLocationType[];
    order: React.MutableRefObject<number[]>;
}

export default function MapSideBar({ origin, duration, selectedWayPoints, order }: MapSideBarProps) {
    const [sideBarVisited, setSideBarVisited] = useState<{ spotId: number }[]>([]);
    const [show, setShow] = useState(true);
    const openDrew = () => setShow(true);
    const closeDrew = () => setShow(false);

    const orderedWayPoints = order.current.map((index: number) => selectedWayPoints[index]);

    const handleSideBarVisitedChange = (id: number, newVisited: boolean) => {
        setSideBarVisited((prevSideBarVisited) => {
            const isAlreadySideBarVisited = prevSideBarVisited.some((spot) => spot.spotId === id);
            if (newVisited && !isAlreadySideBarVisited) {
                return [...prevSideBarVisited, { spotId: id }];
            } else if (!newVisited && isAlreadySideBarVisited) {
                return prevSideBarVisited.filter((spot) => spot.spotId !== id);
            }
            return prevSideBarVisited;
        });
    };

    useEffect(() => {
        const fetchSideBarVisited = async () => {
            try {
                const response = await fetch('/api/searchVisited', { method: 'GET' });
                if (!response.ok) {
                    throw new Error('Failed to fetch visited spots');
                }
                const data: { spotId: number }[] = await response.json();
                setSideBarVisited(data);
            } catch (error) {
                console.error('Error fetching visited spots:', error);
            }
        };

        fetchSideBarVisited();
    }, []);

    return (
        <div>
            {!show && (
                <Button className={styles.barButton} onClick={openDrew}>
                    <KeyboardDoubleArrowLeftIcon
                        sx={{
                            fontSize: 60,
                            color: '#4AA5FF',
                            '@media (max-width: 600px)': {
                                fontSize: '8vw',
                            },
                        }}
                    />
                </Button>
            )}
            <div className={`${styles.mapSideBar} ${show ? styles.open : ""}`}>
                {show && (
                    <>
                        <div className={styles.mapSideBarButtons}>
                            <Button onClick={closeDrew}>
                                <CloseIcon
                                    sx={{
                                        fontSize: '3vw',
                                        color: '#443322',
                                        '@media (max-width: 600px)': {
                                            fontSize: '4vw',
                                        },
                                    }}
                                />
                            </Button>
                            <div className={styles.mapSideBarBackButton}>
                                <MapSideBarBackButton />
                            </div>
                            <div>{/*あえて何も書いていない*/}</div>
                        </div>
                        <div className={styles.mapSideBarDuration}>
                            <h2>所要時間：{duration}</h2>
                        </div>
                        <div className={styles.mapSideBarContent}>
                            <div className={styles.mapSideBarStart}>
                                <h2>出発地点：{origin}</h2>
                            </div>
                            {orderedWayPoints.map((item) => {
                                const isSideBarVisited = sideBarVisited.some((v) => v.spotId === item.id);
                                return (
                                    <MapSideBarCard
                                        key={item.id}
                                        item={item}
                                        isSideBarVisited={isSideBarVisited}
                                        onVisitedChange={(id, visited) => handleSideBarVisitedChange(id, visited)}
                                    />
                                );
                            })}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
