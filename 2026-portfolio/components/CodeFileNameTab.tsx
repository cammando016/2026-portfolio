import globalStyles from '../styles/global.module.scss';
import styles from '../styles/codeFile.module.scss';

interface Props {
    fileName: string,
    fileKey: string,
}

const closeFile = () => {
    alert("Close File")
}

export default function CodeFileNameTab(props: Props) {
    return (
        <div className={`${globalStyles.rowFlex} ${styles.fileName}`}>
            <p className={`${styles.marginSides}`}>TS</p>
            <p className={`${styles.marginSides}`}>{props.fileName}</p>
            <button className={`${styles.marginSides}`} onClick={closeFile}>X</button>
        </div>
    )
}