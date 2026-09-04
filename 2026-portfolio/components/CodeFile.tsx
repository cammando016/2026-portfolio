import styles from '../styles/codeFile.module.scss'
import globalStyles from '../styles/global.module.scss'
import { FileData } from '../types/Files';
import CodeFileNameTab from './CodeFileNameTab';

interface Props {
    file: FileData
}

export default function CodeFile ( props : Props ) {
    const lineNums : number[] = [];

    for (let i = 0; i < props.file.lineCount; i++) {
        lineNums.push(i+1);
    }

    return (
        <div className={`${styles.container} ${globalStyles.greyBorderRight}`}>
            <div className={`${styles.fileBar} ${styles.container}`}>
                <CodeFileNameTab fileName={props.file.fileName} fileKey={props.file.key} />
            </div>

            <div className={`${globalStyles.rowFlex}`}>
                <div className={`${styles.lineNumsContainer}`}>
                    {
                        lineNums.map(l => <p key={l} className={`${styles.lineNum}`}>{l}</p>)
                    }
                </div>
                <p>content</p>
            </div>
        </div>
    )
}