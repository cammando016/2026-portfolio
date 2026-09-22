'use client'

import ReactMarkdown from 'react-markdown';
import styles from '../../styles/codeFile.module.scss';

export default function ReadmeViewer({content} : {content?: string}) {
    if (!content) return null;
    return <div className={styles.markdownContent} ><ReactMarkdown>{content}</ReactMarkdown></div>;
}