import getCurrentUser from "@/app/actions/getCurrentUser";
import { Inter } from "next/font/google";
import styles from "@/app/statics/styles/userStatus.module.css";

const mPlus1p = Inter({ subsets: ['latin'], weight: ['400', '700'] });

//メインイメージ
const UserStatus = async () => {
  const currentUser = await getCurrentUser();
  return (
    <div className={`${styles.userStatus} ${mPlus1p.className}`}>
      {currentUser ? "認証中" : "未認証"}
    </div>
  );
};

export default UserStatus;
