'use client'

import { useState } from "react";
import Icons from "./Icons";
import Links from "./Links";
import { iconOptions } from "../types/Files";
import { usePathname, useRouter } from "next/navigation";

export default function LinksAndIcons() {
    const [showFiles, setShowFiles] = useState<boolean>(true);
    const router = useRouter();
    const pathname = usePathname();
    
    const activeIcon : iconOptions = pathname === '/settings' ? 'settings' : 'files';

    console.log(pathname, activeIcon);

    const handleClickIcon = (iconKey : iconOptions) => {
        if(iconKey === 'files') setShowFiles(prev => !prev);
        else if (iconKey === 'settings') router.push('/settings')
    }

    return (
        <>
            <Icons handleClickIcon={handleClickIcon} activeIcon={activeIcon} />
            {showFiles && <Links /> }
        </>
    )
}