import { Checkbox } from "@mui/material";
import { useState } from "react";
import styles from "@/app/statics/styles/mapSideBar.module.css";
import { SpotLocationType } from "@/app/types";
import { MapSideBarBackButton } from "./Buttons";

interface MapSideBarProps {
    origin: string;
    duration: string;
    selectedWayPoints: SpotLocationType[];
    order: React.MutableRefObject<number[]>;
}

export default function MapSideBar({ origin, duration, selectedWayPoints, order }: MapSideBarProps) {
    // 各チェックボックスの状態を管理
    const [checkedItems, setCheckedItems] = useState<{ [key: number]: boolean }>({});
    
    // orderに基づいてselectedWayPointsの順番を変更
    const orderedWayPoints = order.current.map((index: number) => selectedWayPoints[index]);

    const handleChange = (id: number) => {
        setCheckedItems((prev) => ({
            ...prev,
            [id]: !prev[id], // 現在の状態を反転
        }));
    };

    return (
        <div className={styles.mapSideBar}>
            <div className={styles.mapSideBarBackButton}>
                <MapSideBarBackButton/>
            </div>
            <div className={styles.mapSideBarDuration}>
                <h2>所要時間：{duration}</h2>
            </div>
            <div className={styles.mapSideBarContent}>
                <div className={styles.mapSideBarStart}>
                    <h2>出発地点：{origin}</h2>
                </div>
                {orderedWayPoints.map((item) => (
                    <div key={item.id} className={styles.mapSideBarCard}>
                        <h2>{item.id}</h2>
                        <div className={styles.mapSideBarCardTitle}>
                            <h2>{item.title}</h2>
                        </div>
                        <Checkbox
                            checked={!!checkedItems[item.id]} // 状態が未定義の場合は false
                            onChange={() => handleChange(item.id)}
                            sx={{
                                '& .MuiSvgIcon-root': { fontSize: 40 },
                                '&.Mui-checked': {
                                    color: '#FF951C',
                                },
                            }}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}
