'use client'
import styles from '../styles/home-layout.module.scss';
import globalStyles from '../styles/global.module.scss';
import SectionLinks from './SectionLinks';

export default function Links () {
    return (
        <div className={styles.filesPane}>
            <div className={`${globalStyles.rowFlex}`}>
                <button>{`>`}</button>
                <p>My Portfolio</p>
            </div>

            <SectionLinks sectionName='Home' />
        </div>
    )
}