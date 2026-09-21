'use client'
import styles from '../styles/home-layout.module.scss';
import globalStyles from '../styles/global.module.scss';
import SectionLinks from './SectionLinks';
import { useHomeFileDataStore } from '../store/homeFileDataStore';
import { getOrCreateProjectStore } from '../store/projectStoreRegistry';
import { projectsConfig } from '../data/projectsConfig';

export default function Links () {
    return (
        <div className={styles.filesPane}>

            <SectionLinks sectionName='Home' link='/' useStore={useHomeFileDataStore} />

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