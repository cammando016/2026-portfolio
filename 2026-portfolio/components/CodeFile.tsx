import styles from '../styles/codeFile.module.scss'
import globalStyles from '../styles/global.module.scss'
import { FileData } from '../types/Files';

interface Props {
    file: FileData
}

export default function CodeFile ( props : Props ) {
    const lineNums : number[] = [];
    const Content = props.file.contentComponent;

    for (let i = 0; i < props.file.lineCount; i++) {
        lineNums.push(i+1);
    }

    return (
        <div className={`${styles.container} ${globalStyles.greyBorderRight}`}>
            <div className={`${globalStyles.rowFlex}`}>
                <div className={`${styles.lineNumsContainer}`}>
                    {
                        lineNums.map(l => <p key={l} className={`${styles.lineNum}`}>{l}</p>)
                    }
                </div>
                <Content />
            </div>
        </div>
    )
}