import PlaceIcon from '@mui/icons-material/Place';
import { SelectedSpotButton } from '../ui_parts/Buttons';
import CheckBox from './CheckBox';
import ReviewButton from '@/app/components/spot_card/ReviewButton'; // 修正後のCommentButton
import styles from '@/app/statics/styles/spotCard.module.css';
import { SpotType } from '@/app/types';
import Image from 'next/image';

interface SpotCardProps {
    isSelected: boolean;
    setIsSelected: () => void;
    item: SpotType;
    visited: boolean;
    onVisitedChange: (id: number, visited: boolean) => void;
    selectedSpots: { [key: number]: boolean };
    selectedSpotsCounter: number;
    setSelectedSpotsCounter: React.Dispatch<React.SetStateAction<number>>;
    setIsFirstRender: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function SpotCard({
    isSelected,
    setIsSelected,
    item,
    visited,
    onVisitedChange,
    selectedSpotsCounter,
    setSelectedSpotsCounter,
    setIsFirstRender,
}: SpotCardProps) {
    const handleVisitedChange = (newVisited: boolean) => {
        console.log(`Spot ${item.id} visited status:`, newVisited);
        onVisitedChange(item.id, newVisited);
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
                return "京阪六地蔵";
            default:
                return "なし";
        }
    }

    return (
        <div className={styles.cardWrapper}>
            <div className={`${styles.spotCard} ${isSelected ? styles.selected : styles.unselected}`}>
                <div className={styles.cardContent}>
                    <div className={styles.cardHeader}>
                        <Image
                            width={200}
                            height={150}
                            src={item.pictureUrl}
                            alt={item.title}
                            className={styles.cardImage}
                        />
                        <div>
                            <div className={styles.contentHeader}>
                                <h2>No.{item.id} {item.title}</h2>
                                <div className={styles.contentHeaderButton}>
                                    <div>
                                        <ReviewButton itemId={item.id} />
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
                                            selectedSpotsCounter={selectedSpotsCounter}
                                            setSelectedSpotsCounter={setSelectedSpotsCounter}
                                            setIsFirstRender={setIsFirstRender}
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
