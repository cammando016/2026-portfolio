'use client'

import unselectedFiles from '../assets/fileIconUnselected.png';
import selectedFiles from '../assets/fileIconSelected.png';
import unselectedSettings from '../assets/settingsUnselected.png';
import selectedSettings from '../assets/settingsSelected.png';
import githubLogo from '../assets/githubLogo.png';
import linkedInLogo from '../assets/linkedinLogo.png'
import Image from 'next/image';
import styles from '../styles/home-layout.module.scss';
import { iconOptions } from '../types/Files';

interface Props {
    handleClickIcon: (iconKey: iconOptions) => void;
    activeIcon: iconOptions;
}

export default function Icons (props : Props) {
    const activeIcon = props.activeIcon;

    return (
        <div className={`${styles.iconsPane}`}>
            <div>
                <button className={`${styles.iconContainer} ${activeIcon === 'files' ? styles.iconContainerActive : styles.iconContainerInactive}`} onClick={() => props.handleClickIcon('files')} >
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
                <button className={`${styles.iconContainer} ${activeIcon === 'settings' ? styles.iconContainerActive : styles.iconContainerInactive}`} onClick={() => props.handleClickIcon('settings')} >
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