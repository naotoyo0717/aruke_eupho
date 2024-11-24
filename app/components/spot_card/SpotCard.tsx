/* eslint-disable @next/next/no-img-element */
import PlaceIcon from '@mui/icons-material/Place';
import { SelectedSpotButton } from '../ui_parts/Buttons';
import CheckBox from './CheckBox';
import CommentButton from './CommentButton';
import styles from '@/app/statics/styles/spotCard.module.css';
import { SpotType } from '@/app/types';

interface SpotCardProps {
    isSelected: boolean;
    setIsSelected: () => void;
    item: SpotType;
    visited: boolean;
    onVisitedChange: (id: number, visited: boolean) => void; // 親から渡すvisited変更の関数
}


export default function SpotCard({
    isSelected,
    setIsSelected,
    item,
    visited,
    onVisitedChange,
}: SpotCardProps) {
    // visited の状態が変わったときに親に通知する
    const handleVisitedChange = (newVisited: boolean) => {
        console.log(`Spot ${item.id} visited status:`, newVisited);
        onVisitedChange(item.id, newVisited); // 親に通知
    };


function getNearStation(stationNumber: number): string {
    switch (stationNumber) {
        case 1:
            return "京阪宇治";
        case 2:
            return "JR宇治";
        case 3:
            return "京阪黄檗";
        case 4:
            return "京阪六地蔵"
        default:
            return "なし";
    }
}

    return (
        <div className={styles.cardWrapper}>
            <div className={`${styles.spotCard} ${isSelected ? styles.selected : styles.unselected}`}>
                <div className={styles.cardContent}>
                    <div className={styles.cardHeader}>
                        <img
                            src={item.pictureUrl}
                            alt={item.title}
                            className={styles.cardImage}
                        />
                        <div>
                            <div className={styles.contentHeader}>
                                <h2>No.{item.id} {item.title}</h2>
                                <div className={styles.contentHeaderButton}>
                                    <div>
                                        <CommentButton />
                                    </div>
                                    <div className={styles.checkButton}>
                                        <CheckBox
                                            spotId={item.id}
                                            visited={visited}
                                            onChange={handleVisitedChange} // 親の関数を渡す
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className={styles.spotExplanation}>
                                <p>{item.explanation}</p>
                            </div>
                            <div className={styles.cardHooter}>
                                <div className={styles.spotAddress}>
                                    <div className={styles.spotAddressText}>
                                        <PlaceIcon />
                                        <p>{item.address}</p>
                                        <p>&nbsp;&nbsp;【最寄り: {getNearStation(item.nearStation)}】</p>
                                    </div>
                                    <div className={styles.spotSelectButton}>
                                        <SelectedSpotButton
                                            spotId={item.id}
                                            isSelected={isSelected}
                                            setIsSelected={setIsSelected}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}