'use client'

import CodeFile from "./CodeFile";
import CodeFileNameTab from "./CodeFileNameTab";
import codeFileStyles from '../styles/codeFile.module.scss';
import globalStyles from '../styles/global.module.scss';
import { FileData } from "../types/Files";
import { useHomeFileDataStore } from "../store/homeFileDataStore";

interface Props {
    quarterFiles: FileData[],
    quarter: number
}

export default function QuarterContent (props : Props) {
    const updateActiveScreenQuarter = useHomeFileDataStore(state => state.updateActiveScreenQuarter);
    
    return (
        <div className={`${codeFileStyles.screenQuarterContainer}`} onClick={() => updateActiveScreenQuarter(props.quarter)}>
            <div className={`${codeFileStyles.fileBar} ${codeFileStyles.container} ${globalStyles.rowFlex}`}>
                {
                    props.quarterFiles.map(f => <CodeFileNameTab key={f.key} fileName={f.fileName} fileKey={f.key} activeFileInQuarter={f.activeFileInQuarter} />)
                }
            </div>
            {
                props.quarterFiles.length > 0 && <CodeFile file={props.quarterFiles.filter(f => f.activeFileInQuarter)[0]} />
            }
        </div>
    )
}