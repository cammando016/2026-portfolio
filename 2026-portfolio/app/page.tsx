import styles from '../styles/home-layout.module.scss';

export default function Home() {
  return (
    <div className={styles.window}>
      <div className={`${styles.topScreenBar} ${styles.rowFlex} `}>
        <div className={` ${styles.windowControlContainer} ${styles.windowIconRed} `}></div>
        <div className={` ${styles.windowControlContainer} ${styles.windowIconYellow} `}></div>
        <div className={` ${styles.windowControlContainer} ${styles.windowIconGreen} `}></div>
      </div>

      <div className={`${styles.homeContainer} ${styles.rowFlex} `}>
        <div className={styles.iconsPane}>
          <p>icons</p>
        </div>
        <div className={styles.filesPane}>
          <p>links</p>
        </div>
        <div>
          <p>content</p>
        </div>
      </div>

      <div className={styles.bottomScreenBar}>
        <div>footer</div>
      </div>
    </div>
  );
}
