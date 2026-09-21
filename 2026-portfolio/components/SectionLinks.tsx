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

    return (
        <div>
            <div className={`${globalStyles.rowFlex} ${globalStyles.paddingTopBottom}`}>
                <button disabled={!isActiveSection} onClick={() => setShowLinks(!showLinks)}><span className={`${styles.sectionLinksChevron} ${(showLinks && isActiveSection) ? styles.sectionLinksChevronExpanded : ''}`}>{`>`}</span></button> 
                <button disabled={isActiveSection} onClick={() => router.push(props.link)} className={styles.linkText} >{props.sectionName}</button>
            </div>
            <div className={`${styles.sectionLinksContainer}`}>
            {
                (isActiveSection && showLinks) && fileData.map(f => {
                    return (
                    <div key={f.key} className={`${globalStyles.paddingTopBottom} ${styles.linkText}`} >
                        <button 
                            onClick={() => openFile(f.key)}
                            className={`${globalStyles.button}`}
                        >
                            {f.fileName}
                        </button>
                    </div>    
                )})
            }
            </div>
        </div>
    )
}