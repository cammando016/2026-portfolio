'use client'

import CodeFile from "./CodeFile";
import CodeFileNameTab from "./CodeFileNameTab";
import codeFileStyles from '../styles/codeFile.module.scss';
import globalStyles from '../styles/global.module.scss';
import { FileData } from "../types/Files";
import { useCurrentFileDataStore } from "../store/fileDataStoreContext";
import React, { useRef, useState, CSSProperties } from "react";
import { usePathname } from "next/navigation";

interface Props {
    quarterFiles: FileData[],
    quarter: number,
    offerVerticalDropTarget?: number,
    offerHorizontalDropTarget?: number,
    isOnMobile: boolean,
    onContentHeightChange?: (height: number) => void,
    flexStyle?: CSSProperties,
}

type EdgeZone = 'bottom' | 'right' | null;
const EDGE_THRESHOLD : number = 0.2;

export default function QuarterContent (props : Props) {
    //Get pathname to fill out file being viewed in quarter
    const pathname = usePathname();
    const pathnamePieces : string[] = pathname.split('/').slice(1);
    if (pathnamePieces.length === 1) pathnamePieces[0] = 'about me';

    const activeFile = props.quarterFiles.filter(f => f.activeFileInQuarter)[0];
    const updateActiveScreenQuarter = useCurrentFileDataStore(state => state.updateActiveScreenQuarter);
    const updateFileScreenQuarter = useCurrentFileDataStore(state => state.updateFileScreenQuarter);
    const [isDragging, setIsDragging] = useState<boolean>(false);
    const [edgeZone, setEdgeZone] = useState<EdgeZone>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const dragCounter = useRef<number>(0);

    const fileBarRef = useRef<HTMLDivElement>(null);
    const pathnameRef = useRef<HTMLDivElement>(null);

    const handleContentHeightChange = (contentHeight: number) => {
        if (contentHeight === Infinity) {
            props.onContentHeightChange?.(Infinity);
            return;
        }
        const chromeHeight = (fileBarRef.current?.offsetHeight ?? 0) + (pathnameRef.current?.offsetHeight ?? 0);
        props.onContentHeightChange?.(contentHeight + chromeHeight);
    }

    const computeEdgeZone = (e: React.DragEvent<HTMLDivElement>) : EdgeZone => {
        if (!containerRef.current) return null;
        const rect = containerRef.current.getBoundingClientRect();
        const relX = (e.clientX - rect.left) / rect.width;
        const relY = (e.clientY - rect.top) / rect.height;

        if (props.offerVerticalDropTarget && relY > 1 - EDGE_THRESHOLD) return 'bottom';
        if (props.offerHorizontalDropTarget && relX > 1 - EDGE_THRESHOLD) return 'right'
        return null;
    }

    const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        dragCounter.current += 1;
        setIsDragging(true);
    }

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        setEdgeZone(computeEdgeZone(e))
    }

    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        dragCounter.current -= 1;
        if (dragCounter.current <= 0) {
            dragCounter.current = 0;
            setIsDragging(false);
            setEdgeZone(null);
        }
    }

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        dragCounter.current = 0;
        const draggedFileKey = e.dataTransfer.getData('text/plain');

        setIsDragging(false);

        let targetQuarter = props.quarter;
        if (edgeZone === 'bottom' && props.offerVerticalDropTarget) targetQuarter = props.offerVerticalDropTarget;
        if (edgeZone === 'right' && props.offerHorizontalDropTarget) targetQuarter = props.offerHorizontalDropTarget;

        setEdgeZone(null);
        if (draggedFileKey) updateFileScreenQuarter(draggedFileKey, targetQuarter);
    }

    const dragHandlers = props.isOnMobile ? {} : {
        onDragEnter: handleDragEnter,
        onDragOver: handleDragOver,
        onDragLeave: handleDragLeave,
        onDrop: handleDrop
    }

    return (
        <div
            ref={containerRef}
            className={`${codeFileStyles.screenQuarterContainer} ${!props.isOnMobile && isDragging && !edgeZone ? codeFileStyles.dragOver : ''}`} 
            style={props.flexStyle}
            onClick={() => updateActiveScreenQuarter(props.quarter)}
            {...dragHandlers}
        >
            {edgeZone && (
                <div className={`${codeFileStyles.edgeZoneIndicator} ${codeFileStyles[`edgeZone_${edgeZone}`]} ${codeFileStyles.dragOver} `}></div>
            )}
            <div ref={fileBarRef} className={`${codeFileStyles.fileBar} ${globalStyles.rowFlex}`}>
                {
                    props.quarterFiles.map(f => <CodeFileNameTab key={f.key} fileName={f.fileName} fileExtension={f.fileExtension} fileKey={f.key} activeFileInQuarter={f.activeFileInQuarter} isOnMobile={props.isOnMobile} />)
                }
            </div>
            {props.quarterFiles.length > 0 && (
                <div className={`${codeFileStyles.codeFileWrapper}`}>
                    <div ref={pathnameRef} className={`${globalStyles.rowFlex} ${codeFileStyles.pathnameContainer}`}>
                        {pathnamePieces.map(p => <p className={`${codeFileStyles.pathnamePiece}`} key={p}>{`${p} >`}</p> )}
                        <p className={`${codeFileStyles.pathnamePiece}`}>{activeFile.fileName}.{activeFile.fileExtension}</p>
                    </div>
                    <CodeFile file={props.quarterFiles.filter(f => f.activeFileInQuarter)[0]} onContentHeightChange={handleContentHeightChange} />
                </div>
            )}
        </div>
    )
}