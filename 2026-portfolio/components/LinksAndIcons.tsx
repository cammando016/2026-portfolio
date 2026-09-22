'use client'

import { useState } from "react";
import Icons from "./Icons";
import Links from "./Links";
import { iconOptions } from "../types/Files";

export default function LinksAndIcons() {
    const [activeIcon, setActiveIcon] = useState<iconOptions>('files');

    const handleClickIcon = (iconKey : iconOptions) => {
        if(activeIcon === iconKey) setActiveIcon(null);
        else setActiveIcon(iconKey);
    }

    return (
        <>
            <Icons handleClickIcon={handleClickIcon} activeIcon={activeIcon} />
            {activeIcon === 'files' && <Links />}
        </>
    )
}