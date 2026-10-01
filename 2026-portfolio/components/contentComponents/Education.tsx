'use client'

import { useShowTagsContext } from "../../store/showTagsContext";
import styles from '../../styles/codeFile.module.scss';

export default function Education () {
    const {showTags} = useShowTagsContext();
    return (
        <div>
            <h3>
                {showTags && <span className={styles.tagLabel}>{`<h3>`}</span>}
                Bachelor of ICT
                {showTags && <span className={styles.tagLabel}>{`</h3>`}</span>}
            </h3>
            <p>
                {showTags && <span className={styles.tagLabel}>{`<p>`}</span>}
                Swinburne University of Technology
                {showTags && <span className={styles.tagLabel}>{`</p>`}</span>}
            </p>

            <br/>

            <h3>
                {showTags && <span className={styles.tagLabel}>{`<h3>`}</span>}
                Victorian Certificate of Education
                {showTags && <span className={styles.tagLabel}>{`</h3>`}</span>}
            </h3>
            <p>
                {showTags && <span className={styles.tagLabel}>{`<p>`}</span>}
                Gleneagles Secondary College
                {showTags && <span className={styles.tagLabel}>{`</p>`}</span>}
            </p>
            <p>
                {showTags && <span className={styles.tagLabel}>{`<p>`}</span>}
                Valedictorian, Dux
                {showTags && <span className={styles.tagLabel}>{`</p>`}</span>}
            </p>
        </div>
    )
}