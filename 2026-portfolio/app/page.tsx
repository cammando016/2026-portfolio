'use client'

import styles from '../styles/home-layout.module.scss';
import { FileData } from '../types/Files';
import { useHomeFileDataStore } from '../store/homeFileDataStore';
import ScreenQuarters from '../components/ScreenQuarters';

export default function Home() {
  const fileData = useHomeFileDataStore(state => state.fileData);
  const quarterFiles: FileData[][] = [[], [], [], []];

  fileData.forEach(f => {
    if (!f.fileOpen) return;
    quarterFiles[f.screenQuarter - 1].push(f);
  })

  return (
    <div className={`${styles.rowFlex} ${styles.contentPane}`}>
      <ScreenQuarters quarterArrays={quarterFiles} />
    </div>
  );
}