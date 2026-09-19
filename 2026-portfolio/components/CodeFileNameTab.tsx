'use client'

import globalStyles from '../styles/global.module.scss';
import styles from '../styles/codeFile.module.scss';
import { useCurrentFileDataStore } from '../store/fileDataStoreContext';

interface Props {
    fileName: string,
    fileKey: string,
    activeFileInQuarter: boolean,
}

export default function CodeFileNameTab(props: Props) {
    const closeFile = useCurrentFileDataStore(state => state.closeFile);
    const updateQuarterActiveFile = useCurrentFileDataStore(state => state.updateQuarterActiveFile)

    return (
        <div className={`${globalStyles.rowFlex} ${styles.fileName} ${props.activeFileInQuarter ? styles.fileNameActive : styles.fileNameInactive}`}>
            <div className={`${globalStyles.rowFlex}`}  onClick={() => updateQuarterActiveFile(props.fileKey)} >
                <p className={`${styles.paddingSides}`}>TS</p>
                <p className={`${styles.paddingSides}`}>{props.fileName}</p>
            </div>
            <div>
                <button className={`${styles.paddingSides} ${globalStyles.button}`} onClick={() => closeFile(props.fileKey)}>X</button>
            </div>
        </div>
    )
}