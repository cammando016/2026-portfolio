'use client'

import { useShowTagsContext } from "../../store/showTagsContext";
import styles from '../../styles/codeFile.module.scss';
import { educationContent } from "../../data/education";
import React from "react";

export default function Education () {
    const {showTags} = useShowTagsContext();
    return (
        <div>
            {educationContent.sections.map((s, i) => (
                <React.Fragment key={s.heading}>
                    <h3>
                        {showTags && <span className={styles.tagLabel}>{`<h3>`}</span>}
                        {s.heading}
                        {showTags && <span className={styles.tagLabel}>{`</h3>`}</span>}
                    </h3>
                    {s.paragraphs.map((p, i) => (
                        <p key={i}>
                            {showTags && <span className={styles.tagLabel}>{`<p>`}</span>}
                            {p}
                            {showTags && <span className={styles.tagLabel}>{`</p>`}</span>}
                        </p>
                    ))}
                    {i < educationContent.sections.length - 1 && <br />}
                </React.Fragment>
            ))}
        </div>
    )
}