'use client'

import { FileData } from "../types/Files";
import globalStyles from '../styles/global.module.scss';
import { useState } from "react";

interface Props {
    sectionName: string,
    files: FileData[],
    openFile?: (key : string) => void,
}

export default function SectionLinks (props: Props) {
    const [showLinks, setShowLinks] = useState<boolean>(true);

    return (
        <div>
            <div className={`${globalStyles.rowFlex}`}>
                <button onClick={() => setShowLinks(!showLinks)}>{`>`}</button>
                <p>{props.sectionName}</p>
            </div>
            {
                showLinks && props.files.map(f => {
                    return (
                    <div key={f.key} >
                        <button 
                            // onClick={() => props.openFile(f.key)}
                            className={`${globalStyles.button}`}
                        >
                            {f.fileName}
                        </button>
                    </div>    
                )})
            }
        </div>
    )
}