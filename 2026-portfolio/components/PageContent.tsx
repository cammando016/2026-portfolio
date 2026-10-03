'use client'

import React from "react";
import { useShowTagsContext } from "../store/showTagsContext";
import styles from '../styles/codeFile.module.scss';
import { TextContent } from "../types/Files";

interface Props {
    content: TextContent,
    sectionPBreaks?: boolean,
}

export default function PageContent (props : Props) {
    const {showTags} = useShowTagsContext();
    return (
        <div className={styles.text}>
            {props.content.sections.map((s, i) => (
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
                            {/* Preference for smaller text components styling is no line break between paragraphs */}
                            { props.sectionPBreaks && j < s.paragraphs.length - 1 && <br /> } 
                        </React.Fragment>
                    ))}
                    {/* Always show a line break after final paragraph if not the final section */}
                    { i < props.content.sections.length - 1 && <br /> }
                </React.Fragment>
            ))}
        </div>
    )
}