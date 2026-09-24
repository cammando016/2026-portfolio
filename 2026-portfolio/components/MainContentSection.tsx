'use client'

import { FileData } from "../types/Files";
import ScreenQuarters from "./ScreenQuarters";
import styles from '../styles/home-layout.module.scss';
import { useCurrentFileDataStore } from "../store/fileDataStoreContext";
import { useEffect, useRef } from "react";

const MOBILE_WIDTH_BREAKPOINT = 768;

export default function MainContentSection () {
    const updateActiveScreenQuarter = useCurrentFileDataStore(state => state.updateActiveScreenQuarter);
    const collapseAllToQuarter = useCurrentFileDataStore(state => state.collapseAllToQuarter);
    const hasCollapsedRef = useRef<boolean>(false);
    const fileData = useCurrentFileDataStore(state => state.fileData);

    useEffect(() => {
        const mediaQuery = window.matchMedia(`(max-width: ${MOBILE_WIDTH_BREAKPOINT}px)`);
        const handleChange = (e: MediaQueryListEvent | MediaQueryList) => {
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


    return (
        <>
            <div className={`${styles.rowFlex} ${styles.contentPane}`}>
                <ScreenQuarters quarterArrays={quarterFiles} />
            </div>
        </>
    )
}