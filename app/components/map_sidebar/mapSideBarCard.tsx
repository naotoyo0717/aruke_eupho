'use client'

import { SpotLocationType } from "@/app/types";
import styles from "@/app/statics/styles/mapSideBar.module.css";
import MapSideBarCheckBox from "./mapSideBarCheckBox";

interface MapSideBarCardProps {
    item: SpotLocationType;
    isSideBarVisited: boolean;
    onVisitedChange: (id: number, visited: boolean) => void;
}

export default function MapSideBarCard({ item, isSideBarVisited, onVisitedChange }: MapSideBarCardProps) {
    return (
        <div key={item.id} className={styles.mapSideBarCard}>
            <h2>No.{item.id}</h2>
            <div className={styles.mapSideBarCardTitle}>
                <h2>{item.title}</h2>
            </div>
            <MapSideBarCheckBox
                spotId={item.id}
                isSideBarVisited={isSideBarVisited}
                onVisitedChange={(visited) => onVisitedChange(item.id, visited)} // 部分適用で id を固定
            />
        </div>
    );
}
