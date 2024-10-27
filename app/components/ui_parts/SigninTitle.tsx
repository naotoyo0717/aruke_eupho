import { Inter } from "next/font/google";
import  styles from "@/app/statics/styles/signinTitle.module.css";

const mPlus1p = Inter({ subsets: ['latin'], weight: ['400', '700'] });

export function SigninTitle() {
    return (
        <>
            <div className={`${styles.SigninTitle} ${mPlus1p.className}`}>
                歩け！聖地巡礼♪
            </div>
            <hr className={styles.horizontalLine}></hr>
        </>
    )
}