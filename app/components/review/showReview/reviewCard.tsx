import { Review } from "@/app/types"
import styles from '@/app/statics/styles/showReview.module.css';

interface ReviewCardProps {
    review: Review;
}

export default function ReviewCard ({review}: ReviewCardProps) {
    return (
        <div key={review.id}>
            <div className={styles.userInfo}>
                <img
                    className={styles.userIcon} 
                    src={review.userImage}
                    alt="ユーザーアイコン"
                />
                <div className={styles.speech}>
                    <div className={styles.userName}>{review.userName}</div>
                    <div className={styles.triangle}></div>
                </div>
            </div>
            <div className={styles.reviewContent}>
                <div className={styles.titleContent}>
                    <h3>{review.title}</h3>
                    <p>{new Intl.DateTimeFormat('ja-JP', { dateStyle: 'short', timeStyle: 'short' }).format(new Date(review.createdAt))}</p>
                </div>
                <p>{review.content}</p>
            </div>
        </div>
    )
}