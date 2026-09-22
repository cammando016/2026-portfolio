'use client'

import { useState } from "react";
import Icons from "./Icons";
import Links from "./Links";
import { iconOptions } from "../types/Files";
import { useRouter } from "next/navigation";

export default function LinksAndIcons() {
    const [activeIcon, setActiveIcon] = useState<iconOptions>('files');
    const router = useRouter();

    const handleClickIcon = (iconKey : iconOptions) => {
        if(activeIcon === iconKey) setActiveIcon(null);
        else if (iconKey === 'files') {
            setActiveIcon(iconKey);
            router.push('/')
        }
        else if (iconKey === 'settings') {
            setActiveIcon(iconKey);
            router.push('/settings');
        }
        else setActiveIcon(iconKey);
    }

    return (
        <>
            <Icons handleClickIcon={handleClickIcon} activeIcon={activeIcon} />
            {activeIcon === 'files' && <Links />}
        </>
    )
}