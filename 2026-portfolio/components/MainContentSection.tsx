'use client'

import { FileData } from "../types/Files";
import ScreenQuarters from "./ScreenQuarters";
import styles from '../styles/home-layout.module.scss';
import { useCurrentFileDataStore } from "../store/fileDataStoreContext";
import { useEffect, useState } from "react";
import Landing from "./contentComponents/Landing";

const MOBILE_WIDTH_BREAKPOINT = 768;

export default function MainContentSection () {
    const collapseAllToQuarter = useCurrentFileDataStore(state => state.collapseAllToQuarter);
    const fileData : FileData[] = useCurrentFileDataStore(state => state.fileData);
    const [isOnMobile, setIsOnMobile] = useState<boolean>(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia(`(max-width: ${MOBILE_WIDTH_BREAKPOINT}px)`);
        const handleChange = (e: MediaQueryListEvent | MediaQueryList) => {
            setIsOnMobile(e.matches);
            if (e.matches) collapseAllToQuarter(1);
        }

        handleChange(mediaQuery);
        mediaQuery.addEventListener('change', handleChange);

        return () => mediaQuery.removeEventListener('change', handleChange)
    }, [collapseAllToQuarter])

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