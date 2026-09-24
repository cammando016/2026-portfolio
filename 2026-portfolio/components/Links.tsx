'use client'
import styles from '../styles/home-layout.module.scss';
import globalStyles from '../styles/global.module.scss'
import SectionLinks from './SectionLinks';
import { useHomeFileDataStore } from '../store/homeFileDataStore';
import { getOrCreateProjectStore } from '../store/projectStoreRegistry';
import { projectsConfig } from '../data/projectsConfig';
import { usePathname, useRouter } from 'next/navigation';

export default function Links () {
    const router = useRouter();
    const sectionPathname : string = usePathname();
    const isActiveSection : boolean = sectionPathname === '/'
    return (
        <div className={styles.filesPane}>

            <div onClick={() => router.push('/')} className={`${globalStyles.rowFlex} ${globalStyles.paddingTopBottom} ${!isActiveSection ? globalStyles.hover : styles.focusedFile}`}>
                <button disabled={isActiveSection} onClick={() => router.push('/')} className={styles.linkText} >Home</button>
            </div>
            <SectionLinks sectionName='About Me' link='/about-me' useStore={useHomeFileDataStore} />

            {
                projectsConfig.map(p => {
                    return (
                        <SectionLinks key={p.slug} sectionName={`PROJECT: ${p.title}`} link={`/projects/${p.slug}`} useStore={getOrCreateProjectStore(p.slug)} />
                    )
                })
            }
        </div>
    )
}