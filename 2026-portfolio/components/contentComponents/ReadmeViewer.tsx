'use client'

import ReactMarkdown from 'react-markdown';
import styles from '../../styles/codeFile.module.scss';
import { JSX } from 'react/jsx-runtime';
import React from 'react';
import { useShowTagsContext } from '../../store/showTagsContext';

const LINE_HEIGHT_PIXELS = 24;

function createTagComponent(tagName: string, Tag: keyof JSX.IntrinsicElements, showTags: boolean) {
    const Component = ({children} : {children? : React.ReactNode}) => {
        if (!showTags) {
            return (
                <>
                    <Tag>{children}</Tag>
                </>
            )
        }

        return (
            <>
                <Tag style={{ margin: 0, lineHeight: `${LINE_HEIGHT_PIXELS}px` }}>
                    <span className={styles.tagLabel}>{`<${tagName}>`}</span>
                    {children}
                    <span className={styles.tagLabel}>{`</${tagName}>`}</span>
                </Tag>
                <p aria-hidden="true" style={{ margin: 0, height: `${LINE_HEIGHT_PIXELS}px`, lineHeight: `${LINE_HEIGHT_PIXELS}px` }}>&nbsp;</p>
            </>
        );
    }
    Component.displayName = `${tagName}WithTagLabels`;
    return Component
}

export default function ReadmeViewer({content} : {content?: string}) {
    const {showTags} = useShowTagsContext();

    if (!content) return null;
    return (
        <div className={styles.markdownContent} >
            <ReactMarkdown
                components={{
                    p: createTagComponent('p', 'p', showTags),
                    h1: createTagComponent('h1', 'h1', showTags),
                    h2: createTagComponent('h2', 'h2', showTags),
                    h3: createTagComponent('h3', 'h3', showTags),
                    ul: createTagComponent('ul', 'ul', showTags),
                    ol: createTagComponent('ol', 'ol', showTags),
                }}
            >{content}</ReactMarkdown>
        </div>
    )
}