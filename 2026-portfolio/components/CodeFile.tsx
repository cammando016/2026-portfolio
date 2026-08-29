import styles from '../styles/codeFile.module.scss'
import globalStyles from '../styles/global.module.scss'

interface Props {
    fileName: string;
    lineCount: number;
}

export default function CodeFile ( props : Props ) {
    const lineNums : number[] = [];

    for (let i = 0; i < props.lineCount; i++) {
        lineNums.push(i+1);
    }

    return (
        <div className={`${styles.container} ${globalStyles.greyBorderRight}`}>
            <div className={`${globalStyles.rowFlex} ${styles.fileBar}`}>
                <p className={` ${styles.fileName}`}>{props.fileName}</p>
            </div>

            <p>link url</p>

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