import { FC, useEffect, useState } from "react";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import styles from '@/app/statics/styles/goTopButton.module.css'

export const Comp: FC = () => {
  // 表示切り替えフラグ
  const [showScrollToTop, setShowScrollToTop] = useState(false);

  useEffect(() => {
    // スクロールイベントを監視する関数
    const watchScroll = () => {
      const basePosition = 150;
      const scrollPosition = window.scrollY;
      setShowScrollToTop(basePosition <= scrollPosition);
    };

    // イベントリスナーを追加
    window.addEventListener("scroll", watchScroll);
    return () => {
      window.removeEventListener("scroll", watchScroll);
    };
  }, []);

  return (
    <>
      {showScrollToTop ? (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className={styles.goTopButton}
        >
          <KeyboardArrowUpIcon
            sx = {{
              fontSize: "3vw",
              marginBottom: "-2vh",
              '@media (max-width: 600px)': {
                fontSize: "6vw",
                marginBottom: "-1vh",  
              },
            }}/>
          <p>Top</p>
        </button>
      ) : null}
    </>
  );
};
