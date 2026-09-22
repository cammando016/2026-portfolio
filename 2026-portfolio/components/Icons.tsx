'use client'

import unselectedFiles from '../assets/fileIconUnselected.png';
import selectedFiles from '../assets/fileIconSelected.png';
import unselectedSettings from '../assets/settingsUnselected.png';
import selectedSettings from '../assets/settingsSelected.png';
import githubLogo from '../assets/githubLogo.png';
import linkedInLogo from '../assets/linkedinLogo.png'
import styles from '../styles/home-layout.module.scss';
import { iconOptions } from '../types/Files';
import Icon from './Icon';

interface Props {
    handleClickIcon: (iconKey: iconOptions) => void;
    activeIcon: iconOptions;
}

export default function Icons (props : Props) {
    const activeIcon = props.activeIcon;

    return (
        <div className={`${styles.iconsPane}`}>
            <div>
                <Icon
                    toggleable={true} 
                    activeIcon={activeIcon}
                    iconType='files'
                    handleClickIcon={props.handleClickIcon}
                    selectedIconSrc={selectedFiles}
                    selectedIconAlt='file icon selected'
                    unselectedIconSrc={unselectedFiles}
                    unselectedIconAlt='file icon unselected'
                />
            </div>
            <div>
                <Icon 
                    toggleable={false} 
                    activeIcon={activeIcon}
                    iconType='logo'
                    handleClickIcon={props.handleClickIcon}
                    selectedIconSrc={githubLogo}
                    selectedIconAlt='github logo'
                    href=''
                />
                <Icon 
                    toggleable={false} 
                    activeIcon={activeIcon}
                    iconType='logo'
                    handleClickIcon={props.handleClickIcon}
                    selectedIconSrc={linkedInLogo}
                    selectedIconAlt='linked in logo'
                    href=''
                />
                <Icon 
                    toggleable={true} 
                    activeIcon={activeIcon}
                    iconType='settings'
                    handleClickIcon={props.handleClickIcon}
                    selectedIconSrc={selectedSettings}
                    selectedIconAlt='settings icon selected'
                    unselectedIconSrc={unselectedSettings}
                    unselectedIconAlt='settings icon unselected'
                />
            </div>
        </div>
    )
}