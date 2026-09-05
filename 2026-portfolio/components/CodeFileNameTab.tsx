import globalStyles from '../styles/global.module.scss';
import styles from '../styles/codeFile.module.scss';

interface Props {
    fileName: string,
    fileKey: string,
    closeFile: (key: string) => void,
}

export default function CodeFileNameTab(props: Props) {
    return (
        <div className={`${globalStyles.rowFlex} ${styles.fileName}`}>
            <p className={`${styles.paddingSides}`}>TS</p>
            <p className={`${styles.paddingSides}`}>{props.fileName}</p>
            <button className={`${styles.paddingSides} ${globalStyles.button}`} onClick={() => props.closeFile(props.fileKey)}>X</button>
        </div>
    )
}