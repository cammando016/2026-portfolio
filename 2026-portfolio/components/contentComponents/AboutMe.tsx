'use client'

import React from "react";
import { backgroundContent } from "../../data/background";
import { useShowTagsContext } from "../../store/showTagsContext"
import styles from '../../styles/codeFile.module.scss';

export default function AboutMe () {
    const {showTags} = useShowTagsContext();
    return (
        <div className={styles.text}>
            {backgroundContent.sections.map((s, i) => (
                <React.Fragment key={s.heading}>
                    <h3>
                        {showTags && <span className={styles.tagLabel}>{`<h3>`}</span>}
                        {s.heading}
                        {showTags && <span className={styles.tagLabel}>{`</h3>`}</span>}
                    </h3>
                    {s.paragraphs.map((p, j) => (
                        <React.Fragment key={j}>
                            <p>
                                {showTags && <span className={styles.tagLabel}>{`<p>`}</span>}
                                {p}
                                {showTags && <span className={styles.tagLabel}>{`</p>`}</span>}
                            </p>
                            {/* Line break shouldn't show after final paragraph of final section */}
                            {(j < s.paragraphs.length - 1 || i < backgroundContent.sections.length - 1) && <br />} 
                        </React.Fragment>
                    ))}
                </React.Fragment>
            ))}
        </div>
    )
}