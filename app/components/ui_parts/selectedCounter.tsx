import styles from "@/app/statics/styles/visitedCounter.module.css"

interface SelectedCounterProps {
    selectedSpotsCounter: number;
}

export default function SelectedCounter({ selectedSpotsCounter }: SelectedCounterProps) {
    return (
        <div className={styles.visitedCounter}>
            現在の選択数：{selectedSpotsCounter}
        </div>
    )
}