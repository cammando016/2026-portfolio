'use client'

import { FileData } from "../types/Files";
import ScreenQuarters from "./ScreenQuarters";
import styles from '../styles/home-layout.module.scss';
import { useCurrentFileDataStore } from "../store/fileDataStoreContext";
import { useEffect, useRef, useState } from "react";
import Landing from "./contentComponents/Landing";

const MOBILE_WIDTH_BREAKPOINT = 768;

export default function MainContentSection () {
    const updateActiveScreenQuarter = useCurrentFileDataStore(state => state.updateActiveScreenQuarter);
    const collapseAllToQuarter = useCurrentFileDataStore(state => state.collapseAllToQuarter);
    const hasCollapsedRef = useRef<boolean>(false);
    const fileData : FileData[] = useCurrentFileDataStore(state => state.fileData);
    const [isOnMobile, setIsOnMobile] = useState<boolean>(false);

    console.log(isOnMobile);

    useEffect(() => {
        const mediaQuery = window.matchMedia(`(max-width: ${MOBILE_WIDTH_BREAKPOINT}px)`);
        const handleChange = (e: MediaQueryListEvent | MediaQueryList) => {
            setIsOnMobile(e.matches);
            if (e.matches && !hasCollapsedRef.current) {
                hasCollapsedRef.current = true;
                updateActiveScreenQuarter(1);
                collapseAllToQuarter(1);
            } else if (!e.matches) {
                hasCollapsedRef.current = (false);
            }
        }

        handleChange(mediaQuery);
        mediaQuery.addEventListener('change', handleChange);

        return () => mediaQuery.removeEventListener('change', handleChange)
    }, [updateActiveScreenQuarter, collapseAllToQuarter])

    const quarterFiles : FileData[][] = [[], [], [], []];
    fileData.forEach(f => {
        if (!f.fileOpen) return;
        quarterFiles[f.screenQuarter - 1].push(f);
    });

    const hasOpenFiles = quarterFiles.some(quarter => quarter.some(files => files.fileOpen));

    return (
        <>
            <div className={`${styles.rowFlex} ${styles.contentPane}`}>
                {hasOpenFiles ?
                    <ScreenQuarters quarterArrays={quarterFiles} isOnMobile={isOnMobile} />
                    :
                    <Landing />
                }
            </div>
        </>
    )
}