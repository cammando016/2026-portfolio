'use client'

import CodeFile from "./CodeFile";
import CodeFileNameTab from "./CodeFileNameTab";
import codeFileStyles from '../styles/codeFile.module.scss';
import globalStyles from '../styles/global.module.scss';
import { FileData } from "../types/Files";
import { useCurrentFileDataStore } from "../store/fileDataStoreContext";
import React, { useRef, useState } from "react";

interface Props {
    quarterFiles: FileData[],
    quarter: number
}

export default function QuarterContent (props : Props) {
    const updateActiveScreenQuarter = useCurrentFileDataStore(state => state.updateActiveScreenQuarter);
    const updateFileScreenQuarter = useCurrentFileDataStore(state => state.updateFileScreenQuarter);
    const [isDragOver, setIsDragOver] = useState<boolean>(false);
    const dragCounter = useRef<number>(0);

    const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        dragCounter.current += 1;
        setIsDragOver(true);
    }

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
    }

    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        dragCounter.current -= 1;
        if (dragCounter.current <= 0) {
            dragCounter.current = 0;
            setIsDragOver(false)
        }
    }

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        dragCounter.current = 0;
        setIsDragOver(false);
        const draggedFileKey = e.dataTransfer.getData('text/plain');
        if (draggedFileKey) updateFileScreenQuarter(draggedFileKey, props.quarter);
    }
    
    return (
        <div 
            className={`${codeFileStyles.screenQuarterContainer} ${isDragOver ? codeFileStyles.dragOver : ''}`} 
            onClick={() => updateActiveScreenQuarter(props.quarter)}
            onDragEnter={handleDragEnter}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
        >
            <div className={`${codeFileStyles.fileBar} ${globalStyles.rowFlex}`}>
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