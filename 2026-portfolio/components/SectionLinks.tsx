'use client'

import globalStyles from '../styles/global.module.scss';
import { useState } from "react";
import { useHomeFileDataStore } from "../store/homeFileDataStore";
import { usePathname, useRouter } from 'next/navigation';

interface Props {
    sectionName: string,
    link: string,
}

export default function SectionLinks (props: Props) {
    //Links of section are only to display if user is currently on that section
    //Reduces clutter and confusion about which files can be accessed at a time
    const sectionPathname : string = usePathname();
    const isActiveSection : boolean = sectionPathname === props.link;

    const [showLinks, setShowLinks] = useState<boolean>(true);
    const openFile = useHomeFileDataStore(state => state.openFile);
    const fileData = useHomeFileDataStore(state => state.fileData);
    const router = useRouter();

    return (
        <div>
            <div className={`${globalStyles.rowFlex}`}>
                { isActiveSection && <button onClick={() => setShowLinks(!showLinks)}>{`>`}</button> }
                <button onClick={() => router.push(props.link)} >{props.sectionName}</button>
            </div>
            {
                (isActiveSection && showLinks) && fileData.map(f => {
                    return (
                    <div key={f.key} >
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
    )
}