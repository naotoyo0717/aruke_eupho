import PlaceIcon from '@mui/icons-material/Place';
import { SelectedSpotButton } from '../ui_parts/Buttons';
import CheckBox from './CheckBox';
import CommentButton from './CommentButton';
import styles from '@/app/statics/styles/spotCard.module.css';
import { SpotArrayType } from '@/app/statics/spotList';

interface SpotCardProps {
    isSelected: boolean;
    setIsSelected: () => void;
    item: SpotArrayType;
}

export default function SpotCard({ isSelected, setIsSelected, item, }: SpotCardProps) {
    const handleVisitedChange = (visited: boolean) => {
        console.log(`Spot ${item.id} visited status:`, visited);
    };

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
                                            visited={item.visited}
                                            onChange={handleVisitedChange} 
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
                                    </div>
                                    <div className={styles.spotSelectButton}>
                                        <SelectedSpotButton isSelected={isSelected} setIsSelected={setIsSelected} />
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
