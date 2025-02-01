import { useEffect, useState } from 'react';
import styles from '@/app/statics/styles/reviewHeader.module.css';
import { SpotType } from '@/app/types';
import PlaceIcon from '@mui/icons-material/Place';
import Image from 'next/image';
import Loading from '@/app/loading';

interface ReviewHeaderProps {
    spotId: number;
}

export default function ReviewHeader({ spotId }: ReviewHeaderProps) {
    const [spot, setSpot] = useState<SpotType[] | null>(null);
    const [isLoading, setIsLoading] = useState(true);

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

    useEffect(() => {
        if (!spotId) {
            console.log("spotIdが取得できません");
            setIsLoading(false);
            return;
        }
        const fetchSpot = async () => {
            try {
                console.log('Fetching spot with ID:', spotId);
                const response = await fetch(`/api/getSpot?spotId=${spotId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch spot');
                }
                const data: SpotType[] = await response.json();
                setSpot(data);
                console.log('Fetched spot:', data);
            } catch (error) {
                console.error('Error fetching spot:', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchSpot();
    }, [spotId]);

    if (isLoading) {
        return <Loading />;
    }

    if (!spot) {
        return <p>値を取得できませんでした。</p>;
    }

    return (
        <div>
            <div className={styles.cardWrapper}>
                <div className={styles.cardContent}>
                    <div className={styles.cardHeader}>
                        <Image
                            width={200}
                            height={150}
                            src={spot[0].pictureUrl}
                            alt={spot[0].title}
                            className={styles.cardImage}
                        />
                        <div>
                            <div className={styles.contentHeader}>
                                <h2>No.{spot[0].id} {spot[0].title}</h2>
                            </div>
                            <div className={styles.spotExplanation}>
                                <p>{spot[0].explanation}</p>
                            </div>
                            <div className={styles.cardHooter}>
                                <div className={styles.spotAddress}>
                                    <div className={styles.spotAddressText}>
                                        <PlaceIcon />
                                        <p>{spot[0].address}</p>
                                        <p>&nbsp;&nbsp;【最寄り: {getNearStation(spot[0].nearStation)}】</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.separator}></div>
        </div>
    );
}
