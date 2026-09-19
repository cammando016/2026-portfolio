'use client'

import { FileData } from "../types/Files";
import ScreenQuarters from "./ScreenQuarters";
import styles from '../styles/home-layout.module.scss';
import { useCurrentFileDataStore } from "../store/fileDataStoreContext";

export default function MainContentSection () {
    const fileData = useCurrentFileDataStore(state => state.fileData);
    const quarterFiles : FileData[][] = [[], [], [], []];

    fileData.forEach(f => {
        if (!f.fileOpen) return;
        quarterFiles[f.screenQuarter - 1].push(f);
    });

    return <div className={`${styles.rowFlex} ${styles.contentPane}`}><ScreenQuarters quarterArrays={quarterFiles} /></div>
}