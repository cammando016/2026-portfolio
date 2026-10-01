'use client'

import { useRef, useState, useEffect } from "react";
import Icons from "./Icons";
import Links from "./Links";
import { iconOptions } from "../types/Files";
import { usePathname, useRouter } from "next/navigation";

const MOBILE_WIDTH_BREAKPOINT = 768;

export default function LinksAndIcons() {
    const [showFiles, setShowFiles] = useState<boolean>(true);
    
    const [isOnMobile, setIsOnMobile] = useState<boolean>(false);
    const hasCollapsedRef = useRef<boolean>(false);

    const router = useRouter();
    const pathname = usePathname();
    
    const activeIcon : iconOptions = pathname === '/settings' ? 'settings' : 'files';

    useEffect(() => {
        const mediaQuery = window.matchMedia(`(max-width: ${MOBILE_WIDTH_BREAKPOINT}px)`);
        const handleChange = (e: MediaQueryListEvent | MediaQueryList) => {
            setIsOnMobile(e.matches);
            if (e.matches && !hasCollapsedRef.current) {
                hasCollapsedRef.current = true;
                setShowFiles(false);
            } else if (!e.matches) {
                hasCollapsedRef.current = false;
            }
        }

        handleChange(mediaQuery);
        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
    }, []);

    const closeFilesPaneMobile = () => {
        if (isOnMobile) setShowFiles(false);
    }

    const handleClickIcon = (iconKey : iconOptions) => {
        console.log('files icon clicked');
        if(iconKey === 'files') setShowFiles(prev => !prev);
        else if (iconKey === 'settings') router.push('/settings')
    }

    return (
        <>
            <Icons handleClickIcon={handleClickIcon} activeIcon={activeIcon} />
            {showFiles && <Links onAnyClick={closeFilesPaneMobile} /> }
        </>
    )
}