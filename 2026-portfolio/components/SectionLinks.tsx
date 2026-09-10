'use client'

import globalStyles from '../styles/global.module.scss';
import { useState } from "react";
import { useFileDataStore } from "../store/fileDataStore";

interface Props {
    sectionName: string,
}

export default function SectionLinks (props: Props) {
    const [showLinks, setShowLinks] = useState<boolean>(true);
    const openFile = useFileDataStore(state => state.openFile);
    const fileData = useFileDataStore(state => state.fileData);

    return (
        <div>
            <div className={`${globalStyles.rowFlex}`}>
                <button onClick={() => setShowLinks(!showLinks)}>{`>`}</button>
                <p>{props.sectionName}</p>
            </div>
            {
                showLinks && fileData.map(f => {
                    return (
                    <div key={f.key} >
                        <button 
                            onClick={() => openFile(f.key)}
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