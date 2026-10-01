'use client'

import { useCurrentFileDataStore } from "../store/fileDataStoreContext"
import { FileData } from "../types/Files"
import styles from '../styles/codeFile.module.scss';

interface Props {
    screenQuarter: number,
}

export default function SplitScreenButtons (props : Props) {
    const fileData : FileData[] = useCurrentFileDataStore(state => state.fileData);

    return (
        <div className={styles.splitScreenButtons}>
            <div 
                className={`${styles.splitScreenButton} ${styles.splitScreenButtonHorizontal} ${props.screenQuarter < 3 ? styles.hoverLastChild : styles.hoverFirstChild}`}
            >
                <span></span>
                <span></span>
            </div>
            <div 
                className={`${styles.splitScreenButton} ${styles.splitScreenButtonVertical} ${props.screenQuarter % 2 === 0 ? styles.hoverFirstChild : styles.hoverLastChild}`}
            >
                <span></span>
                <span></span>
            </div>
        </div>
    )
}