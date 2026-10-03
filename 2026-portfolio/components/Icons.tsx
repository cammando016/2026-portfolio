'use client'

import unselectedFiles from '../assets/fileIconUnselected.png';
import selectedFiles from '../assets/fileIconSelected.png';
import selectedFilesMatrix from '../assets/fileIconSelectedMatrix.png';
import unselectedSettings from '../assets/settingsUnselected.png';
import selectedSettings from '../assets/settingsSelected.png';
import selectedSettingsMatrix from '../assets/settingsSelectedMatrix.png';
import githubLogo from '../assets/githubLogo.png';
import linkedInLogo from '../assets/linkedinLogo.png';
import selectedSearch from '../assets/searchSelected.png';
import selectedSearchMatrix from '../assets/searchSelectedMatrix.png';
import unselectedSearch from '../assets/searchUnselected.png';
import styles from '../styles/home-layout.module.scss';
import { iconOptions } from '../types/Files';
import Icon from './Icon';
import { useThemeContext } from '../store/colourSchemeContext';

interface Props {
    handleClickIcon: (iconKey: 'settings' | 'search' | 'files') => void;
    activeIcon: iconOptions;
}

export default function Icons (props : Props) {
    const activeIcon = props.activeIcon;
    const {theme} = useThemeContext();
    return (
        <div className={`${styles.iconsPane}`}>
            
                <Icon
                    toggleable={true} 
                    activeIcon={activeIcon}
                    iconType='files'
                    handleClickIcon={() => props.handleClickIcon('files')}
                    selectedIconSrc={theme === 'matrix' ? selectedFilesMatrix : selectedFiles}
                    selectedIconAlt='file icon selected'
                    unselectedIconSrc={unselectedFiles}
                    unselectedIconAlt='file icon unselected'
                />

                <Icon 
                    toggleable={true}
                    activeIcon={activeIcon}
                    iconType='search'
                    handleClickIcon={() => props.handleClickIcon('search')}
                    selectedIconSrc={theme === 'matrix' ? selectedSearchMatrix : selectedSearch}
                    selectedIconAlt='search icon selected'
                    unselectedIconSrc={unselectedSearch}
                    unselectedIconAlt='search icon unselected'
                />

                <div className={styles.iconSpacer}></div>
            
                <Icon 
                    toggleable={false} 
                    activeIcon={activeIcon}
                    iconType='logo'
                    selectedIconSrc={githubLogo}
                    selectedIconAlt='github logo'
                    href='https://github.com/cammando016'
                />
                <Icon 
                    toggleable={false} 
                    activeIcon={activeIcon}
                    iconType='logo'
                    selectedIconSrc={linkedInLogo}
                    selectedIconAlt='linked in logo'
                    href='https://www.linkedin.com/in/cameron-anderson-6b3078209/'
                />
                <Icon 
                    toggleable={true} 
                    activeIcon={activeIcon}
                    iconType='settings'
                    handleClickIcon={() => props.handleClickIcon('settings')}
                    selectedIconSrc={theme === 'matrix' ? selectedSettingsMatrix : selectedSettings}
                    selectedIconAlt='settings icon selected'
                    unselectedIconSrc={unselectedSettings}
                    unselectedIconAlt='settings icon unselected'
                />
            
        </div>
    )
}