'use client'

import globalStyles from '../styles/global.module.scss';
import styles from '../styles/home-layout.module.scss'
import { useState } from "react";
import { FileDataState } from '../store/createFileDataStore';
import { usePathname, useRouter } from 'next/navigation';
import { UseBoundStore, StoreApi } from 'zustand';

interface Props {
    sectionName: string,
    link: string,
    useStore: UseBoundStore<StoreApi<FileDataState>>,
}

export default function SectionLinks (props: Props) {
    //Links of section are only to display if user is currently on that section
    //Reduces clutter and confusion about which files can be accessed at a time
    const sectionPathname : string = usePathname();
    const isActiveSection : boolean = sectionPathname === props.link;

    const [showLinks, setShowLinks] = useState<boolean>(true);
    const router = useRouter();

    const openFile = props.useStore(state => state.openFile);
    const fileData = props.useStore(state => state.fileData);
    const activeScreenQuarter = props.useStore(state => state.activeScreenQuarter);

    return (
        <div>
            <div className={`${globalStyles.rowFlex} ${globalStyles.paddingTopBottom} ${!isActiveSection ? globalStyles.hover : ''}`}>
                <button onClick={isActiveSection ? () => setShowLinks(!showLinks) : () => router.push(props.link)}><span className={`${styles.sectionLinksChevron} ${isActiveSection ? globalStyles.hover : ''} ${(showLinks && isActiveSection) ? styles.sectionLinksChevronExpanded : ''}`}>{`>`}</span></button> 
                <button disabled={isActiveSection} onClick={() => router.push(props.link)} className={styles.linkText} >{props.sectionName}</button>
            </div>
            
            {(isActiveSection && showLinks) && fileData.map(f => {
                const isFocused = f.screenQuarter === activeScreenQuarter && f.activeFileInQuarter;
                return (
                    <div onClick={() => openFile(f.key)} role='button' key={f.key} className={`${styles.fileRowOuter} ${isFocused ? styles.focusedFile : globalStyles.hover}`}>
                        <div className={`${styles.fileRowInner} ${globalStyles.paddingTopBottom} ${styles.linkText}`}>
                            <div className={`${styles.fileButton}`}>{f.fileName}</div>
                        </div>
                    </div>
                );
            })}
        </div>
    )
}