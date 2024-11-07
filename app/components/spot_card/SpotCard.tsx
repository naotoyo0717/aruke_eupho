//import Image from 'next/image';

import PlaceIcon from '@mui/icons-material/Place';
import { SelectedSpotButton } from '../ui_parts/Buttons';
import CheckBox from './CheckBox';
import CommentButton from './CommentButton';
import styles from '@/app/statics/styles/spotCard.module.css'

interface SpotCardProps {
    isSelected: boolean;
    setIsSelected: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function SpotCard({ isSelected, setIsSelected }: SpotCardProps) {
    return (
        <>
        <div className={styles.cardWrapper}>
            <div className={`${styles.spotCard} ${isSelected ? styles.selected : styles.unselected}`}>
                <div className={styles.cardContent}>
                    <div className={styles.cardHeader}>
                        <img
                            src="/card_img.jpg"
                            alt="Kumiko Benti"
                            className={styles.cardImage}
                        />
                        <div>

                            <div className={styles.contentHeader}>
                                <h2>No1. 久美子ベンチ</h2>{/*タイトル*/}
                                <div className={styles.contentHeaderButton}>
                                    <div className={styles.commentButton}>
                                        <CommentButton/>
                                    </div>
                                    <div className={styles.checkButton}>
                                        <CheckBox/>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.spotExplanation}>
                                <p>横前久美子が学校帰りによく立ち寄っているベンチ</p>{/*説明*/}
                            </div>

                            <div className={styles.cardHooter}>
                                <div className={styles.spotAddress}> 
                                    <div className={styles.spotAddressText}>
                                        <PlaceIcon/>
                                        <p>Togawa-1-3 Uji, Kyoto 611-0021</p>{/*住所*/}
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
        </>
    );
}
