'use client'

import globalStyles from '../styles/global.module.scss';
import styles from '../styles/codeFile.module.scss';
import { useCurrentFileDataStore } from '../store/fileDataStoreContext';
import React from 'react';

interface Props {
    fileName: string,
    fileKey: string,
    fileExtension: string,
    activeFileInQuarter: boolean,
}

export default function CodeFileNameTab(props: Props) {
    const closeFile = useCurrentFileDataStore(state => state.closeFile);
    const updateQuarterActiveFile = useCurrentFileDataStore(state => state.updateQuarterActiveFile)

    const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
        e.dataTransfer.setData('text/plain', props.fileKey);
        e.dataTransfer.effectAllowed = 'move';
    }

    return (
        <div draggable onDragStart={handleDragStart} className={`${globalStyles.rowFlex} ${styles.fileName} ${props.activeFileInQuarter ? styles.fileNameActive : styles.fileNameInactive}`}>
            <div className={`${globalStyles.rowFlex}`} onClick={() => updateQuarterActiveFile(props.fileKey)} >
                <p className={`${styles.paddingSides}`}>{props.fileExtension}</p>
                <p className={`${styles.paddingSides}`}>{props.fileName}</p>
            </div>
            <button className={`${globalStyles.hover} ${styles.closeFileButton}`} onClick={() => closeFile(props.fileKey)}>X</button>
        </div>
    )
}