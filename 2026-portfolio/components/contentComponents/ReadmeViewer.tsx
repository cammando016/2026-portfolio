'use client'

import ReactMarkdown from 'react-markdown';
import styles from '../../styles/codeFile.module.scss';
import { JSX } from 'react/jsx-runtime';
import React from 'react';

const LINE_HEIGHT_PIXELS = 24;

function createTagComponent(tagName: string, Tag: keyof JSX.IntrinsicElements, showTags: boolean) {
    const Component = ({children} : {children? : React.ReactNode}) => {
        if (!showTags) {
            return (
                <>
                    <Tag>{children}</Tag>
                    <p aria-hidden='true' style={{margin: 0, height: `${LINE_HEIGHT_PIXELS}px`, lineHeight: `${LINE_HEIGHT_PIXELS}px` }}>&nbsp;</p>
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
    const showMarkdownTags = true;

    if (!content) return null;
    return (
        <div className={styles.markdownContent} >
            <ReactMarkdown
                components={{
                    p: createTagComponent('p', 'p', showMarkdownTags),
                    h1: createTagComponent('h1', 'h1', showMarkdownTags),
                    h2: createTagComponent('h2', 'h2', showMarkdownTags),
                    h3: createTagComponent('h3', 'h3', showMarkdownTags),
                    ul: createTagComponent('ul', 'ul', showMarkdownTags),
                    ol: createTagComponent('ol', 'ol', showMarkdownTags),
                }}
            >{content}</ReactMarkdown>
        </div>
    )
}