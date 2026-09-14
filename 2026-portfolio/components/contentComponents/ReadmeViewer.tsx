'use client'

import ReactMarkdown from 'react-markdown';

export default function ReadmeViewer({content} : {content?: string}) {
    if (!content) return null;
    return <ReactMarkdown>{content}</ReactMarkdown>;
}