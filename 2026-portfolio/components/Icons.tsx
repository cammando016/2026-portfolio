'use client'

import unselectedFiles from '../assets/fileIconUnselected.png';
import selectedFiles from '../assets/fileIconSelected.png';
import unselectedSettings from '../assets/settingsUnselected.png';
import selectedSettings from '../assets/settingsSelected.png';
import githubLogo from '../assets/githubLogo.png';
import linkedInLogo from '../assets/linkedinLogo.png'
import Image from 'next/image';
import styles from '../styles/home-layout.module.scss'
import { useState } from 'react';

type iconOptions = 'files' | 'settings' | 'logo' | null;

export default function Icons () {
    const [activeIcon, setActiveIcon] = useState<iconOptions>('files');

    const handleClickIcon = (iconKey : iconOptions) => {
        if(activeIcon === iconKey) setActiveIcon(null);
        else setActiveIcon(iconKey);
    }

    return (
        <div className={`${styles.iconsPane}`}>
            <div>
                <button className={`${styles.iconContainer} ${activeIcon === 'files' ? styles.iconContainerActive : styles.iconContainerInactive}`} onClick={() => handleClickIcon('files')} >
                    {activeIcon === 'files' ? 
                        <Image src={selectedFiles} alt='file icon selected' />
                        :
                        <Image src={unselectedFiles} alt='file icon unselected' />
                    }
                </button>
            </div>
            <div>
                <button className={`${styles.iconContainer} ${styles.iconContainerInactive}`}>
                    <Image src={linkedInLogo} alt='linked in logo' />
                </button>
                <button className={`${styles.iconContainer} ${styles.iconContainerInactive}`}>
                    <Image src={githubLogo} alt='github logo' />
                </button>
                <button className={`${styles.iconContainer} ${activeIcon === 'settings' ? styles.iconContainerActive : styles.iconContainerInactive}`} onClick={() => handleClickIcon('settings')} >
                    {activeIcon === 'settings' ? 
                        <Image src={selectedSettings} alt='file icon selected' />
                        :
                        <Image src={unselectedSettings} alt='file icon unselected' />
                    }
                </button>
            </div>
        </div>
    )
}