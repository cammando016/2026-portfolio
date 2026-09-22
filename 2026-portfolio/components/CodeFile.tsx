'use client'

import { useLayoutEffect, useRef, useState } from 'react';
import styles from '../styles/codeFile.module.scss'
import globalStyles from '../styles/global.module.scss'
import { FileData } from '../types/Files';
import { contentComponentRegistry } from './contentComponents/registry';

interface Props {
    file: FileData
}

const LINE_HEIGHT_PIXELS = 24;

export default function CodeFile ( props : Props ) {
    const Content = contentComponentRegistry[props.file.contentComponent];
    const measureRef = useRef<HTMLDivElement>(null);
    const [lineCount, setLineCount] = useState<number>(1);

    const hasScreenshots =!!props.file.screenshots;

    useLayoutEffect(() => {
        const el = measureRef.current;
        if (!el) return;

        const measureContentHeight = () => {
            const height = el.scrollHeight;
            const lines = Math.max(1, Math.ceil(height / LINE_HEIGHT_PIXELS));
            setLineCount(lines);
        }

        setLineCount(1);
        measureContentHeight();

        const observer = new ResizeObserver(measureContentHeight);
        observer.observe(el);
        return () => observer.disconnect();
    }, [props.file.key]);

    const lineNums: number[] = !hasScreenshots ? Array.from({length: lineCount}, (_, i) => i + 1) : [];

    return (
        <div className={`${styles.container} ${globalStyles.greyBorderRight}`}>
            <div className={`${globalStyles.rowFlex} ${styles.screenQuarterContent}`}>
                {lineNums.length > 0 &&
                    <div className={`${styles.lineNumsContainer}`}>
                        {
                            lineNums.map(l => <p key={l} className={`${styles.lineNum}`} style={{ height: `${LINE_HEIGHT_PIXELS}px`, lineHeight: `${LINE_HEIGHT_PIXELS}px`}} >{l}</p>)
                        }
                    </div>
                }
                <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0 }}>
                    {hasScreenshots ? (
                        <Content content={props.file.content} projectLink={props.file.projectLink} githubLink={props.file.githubLink} screenshots={props.file.screenshots} />
                    ) : (
                        <div ref={measureRef}>
                            <Content content={props.file.content} projectLink={props.file.projectLink} githubLink={props.file.githubLink} screenshots={props.file.screenshots} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}