import { SpotType } from "@/app/types";
import styles from '@/app/statics/styles/spotCard.module.css';
import Image from 'next/image';
import PlaceIcon from '@mui/icons-material/Place';
import { SelectedSpotButton, SelectThumnailButton } from "../ui_parts/Buttons";

interface RecommendSpotCardProps {
    isSelected: boolean;
    setIsSelected: () => void;
    item: SpotType;
    selectedSpots: { [key: number]: boolean };
    selectedSpotsCounter: number;
    setSelectedSpotsCounter: React.Dispatch<React.SetStateAction<number>>;
}

export default function ReccomendSpotCard({
    isSelected,
    setIsSelected,
    item,
    selectedSpotsCounter,
    setSelectedSpotsCounter,
}: RecommendSpotCardProps) {

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
                                        <SelectThumnailButton/>
                                        <SelectedSpotButton
                                            spotId={item.id}
                                            isSelected={isSelected}
                                            setIsSelected={setIsSelected}
                                            selectedSpotsCounter={selectedSpotsCounter}
                                            setSelectedSpotsCounter={setSelectedSpotsCounter}
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