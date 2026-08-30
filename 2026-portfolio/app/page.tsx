'use client'

import CodeFile from '../components/CodeFile';
import { useState } from 'react';
import styles from '../styles/home-layout.module.scss';
import globalStyles from '../styles/global.module.scss';

export default function Home() {
  const [fileData, setFileData] = useState<{key : string; screenQuarter: Number, fileName: string, lineCount: number, showFile: boolean }[]> ([
    { key: crypto.randomUUID(), screenQuarter: 1, fileName: 'About Me', lineCount: 20, showFile: true },
    { key: crypto.randomUUID(), screenQuarter: 2, fileName: 'Github Graph', lineCount: 6, showFile: true },
    { key: crypto.randomUUID(), screenQuarter: 3, fileName: 'Github Graph', lineCount: 6, showFile: true },
    { key: crypto.randomUUID(), screenQuarter: 4, fileName: 'Contact', lineCount: 15, showFile: true },
  ])

  const quarter1Files = fileData.filter(f => f.screenQuarter === 1 && f.showFile);
  const quarter2Files = fileData.filter(f => f.screenQuarter === 2 && f.showFile);
  const quarter3Files = fileData.filter(f => f.screenQuarter === 3 && f.showFile);
  const quarter4Files = fileData.filter(f => f.screenQuarter === 4 && f.showFile);
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

        <div className={`${styles.rowFlex} ${styles.contentPane}`}>
          {
            (quarter1Files.length > 0 || quarter2Files.length > 0) &&
            (
              <div className={`${styles.verticalFileSplit}`}>
                {
                  quarter1Files.map(f => <CodeFile fileName={f.fileName} lineCount={f.lineCount} key={f.key} />)
                }
                {
                  quarter2Files.map(f => <CodeFile fileName={f.fileName} lineCount={f.lineCount} key={f.key} />)
                }
              </div>
            )
          }
          {
            (quarter3Files.length > 0 || quarter4Files.length > 0) &&
            (
              <div className={`${styles.verticalFileSplit}`}>
                {
                  quarter3Files.map(f => <CodeFile fileName={f.fileName} lineCount={f.lineCount} key={f.key} />)
                }
                {
                  quarter4Files.map(f => <CodeFile fileName={f.fileName} lineCount={f.lineCount} key={f.key} />)
                }
              </div>
            )
          }
        </div>
      </div>

      <div className={styles.bottomScreenBar}>
        <div>footer</div>
      </div>
    </div>
  );
}
