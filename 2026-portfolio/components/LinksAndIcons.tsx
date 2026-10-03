'use client'

import { useRef, useState, useEffect } from "react";
import Icons from "./Icons";
import Links from "./Links";
import { iconOptions } from "../types/Files";
import { usePathname, useRouter } from "next/navigation";


import styles from '../styles/home-layout.module.scss';

const MOBILE_WIDTH_BREAKPOINT = 768;

export default function LinksAndIcons() {
    const [panelContent, setPanelContent] = useState<'search' | 'files'>('files');
    const [panelOpen, setPanelOpen] = useState<boolean>(true);

    const [isOnMobile, setIsOnMobile] = useState<boolean>(false);
    const hasCollapsedRef = useRef<boolean>(false);

    const router = useRouter();
    const pathname = usePathname();
    
    const activeIcon : iconOptions = pathname === '/settings' ? 'settings' : panelContent;

    useEffect(() => {
        const mediaQuery = window.matchMedia(`(max-width: ${MOBILE_WIDTH_BREAKPOINT}px)`);
        const handleChange = (e: MediaQueryListEvent | MediaQueryList) => {
            setIsOnMobile(e.matches);
            if (e.matches && !hasCollapsedRef.current) {
                hasCollapsedRef.current = true;
                setPanelOpen(false);
            } else if (!e.matches) {
                hasCollapsedRef.current = false;
            }
        }

        handleChange(mediaQuery);
        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
    }, []);

    const closePanelMobile = () => {
        if (isOnMobile) setPanelOpen(false);
    }

    const handleClickIcon = (iconKey : 'settings' | 'search' | 'files' ) => {
        if (iconKey === 'settings') {
            router.push('/settings');
            return;
        }

        const isShowingClickedIcon = panelOpen && panelContent === iconKey;

        if (isShowingClickedIcon) setPanelOpen(false);
        else {
            setPanelContent(iconKey);
            setPanelOpen(true)
        }
    }

    return (
        <>
            <Icons handleClickIcon={handleClickIcon} activeIcon={activeIcon} />
            {panelOpen && (
                panelContent === 'files' 
                    ? <Links onAnyClick={closePanelMobile} />
                    : <div className={styles.filesPane}><p>Search</p></div> //placeholder to test toggling displayed content
            )}
        </>
    )
}