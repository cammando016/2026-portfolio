'use client'

import styles from '../styles/home-layout.module.scss';
import globalStyles from '../styles/global.module.scss';
import { FileData } from '../types/Files';
import { useLayoutEffect, useRef, useState, CSSProperties } from 'react';
import QuarterContent from './QuarterContent';

interface Props {
    firstFiles: FileData[],
    firstQuarter: number,
    secondFiles: FileData[],
    secondQuarter: number,
    offerVerticalDropTarget?: number,
    offerHorizontalDropTarget?: number,
    isOnMobile: boolean,
}

export default function VerticalSplitPair(props : Props) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [containerHeight, setContainerHeight] = useState<number>(0);
    const [firstHeight, setFirstHeight] = useState<number>(0);
    const [secondHeight, setSecondHeight] = useState<number>(0);

    const hasFirst : boolean = props.firstFiles.length > 0;
    const hasSecond : boolean = props.secondFiles.length > 0;

    useLayoutEffect(() => {
        const el = containerRef.current;
        if (!el) return;

        const observer = new ResizeObserver(([entry]) => setContainerHeight(entry.contentRect.height));
        observer.observe(el);

        return () => observer.disconnect();
    }, []);

    //Give all height to first or second if only one half has files present
    if (hasFirst && !hasSecond) {
        return (
            <div ref={containerRef} className={`${styles.verticalFileSplit} ${globalStyles.columnFlex}`}>
                <QuarterContent 
                    quarterFiles={props.firstFiles}
                    quarter={props.firstQuarter}
                    offerHorizontalDropTarget={props.offerHorizontalDropTarget}
                    offerVerticalDropTarget={props.offerVerticalDropTarget}
                    isOnMobile={props.isOnMobile}
                    flexStyle={{ flex: '1 1 auto', minHeight: 0 }}
                />
            </div>
        )
    }
    if (!hasFirst && hasSecond) {
        return (
            <div ref={containerRef} className={`${styles.verticalFileSplit} ${globalStyles.columnFlex}`}>
                <QuarterContent 
                    quarterFiles={props.secondFiles}
                    quarter={props.secondQuarter}
                    offerHorizontalDropTarget={props.offerHorizontalDropTarget}
                    offerVerticalDropTarget={props.offerVerticalDropTarget}
                    isOnMobile={props.isOnMobile}
                    flexStyle={{ flex: '1 1 auto', minHeight: 0 }}
                />
            </div>
        )
    }
    //Return null if no files
    if (!hasFirst && !hasSecond) return null;

    //Height splitting when both top and bottom have files
    const threshold : number = containerHeight / 2;
    const effectiveFirstHeight : number = hasFirst && firstHeight === 0 ? threshold : firstHeight;
    const effectiveSecondHeight : number = hasSecond && secondHeight === 0 ? threshold : secondHeight;

    const firstFits : boolean = effectiveFirstHeight <= threshold;
    const secondFits : boolean = effectiveSecondHeight <= threshold;

    console.log({
        containerHeight,
        threshold,
        firstHeight,
        secondHeight,
        firstFits,
        secondFits,
        branch: firstFits && !secondFits ? 'first-fixed' : !firstFits && secondFits ? 'second-fixed' : 'even-split',
    })

    let firstStyle: CSSProperties;
    let secondStyle: CSSProperties;
    
    if (firstFits && !secondFits) {
        firstStyle = { flex: '0 0 auto', maxHeight: effectiveFirstHeight, minHeight: 0 }
        secondStyle = { flex: '1 1 0', minHeight: 0 }
    } else if (!firstFits && secondFits) {
        firstStyle = { flex: '1 1 0', minHeight: 0 }
        secondStyle = { flex: '0 0 auto', maxHeight: effectiveSecondHeight, minHeight: 0 }
    } else {
        firstStyle = { flex: '1 1 0', minHeight: 0 };
        secondStyle = { flex: '1 1 0', minHeight: 0};
    }

    return (
        <div ref={containerRef} className={`${styles.verticalFileSplit} ${globalStyles.columnFlex}`}>
            <QuarterContent 
                quarterFiles={props.firstFiles}
                quarter={props.firstQuarter}
                offerHorizontalDropTarget={props.offerHorizontalDropTarget}
                offerVerticalDropTarget={props.offerVerticalDropTarget}
                isOnMobile={props.isOnMobile}
                onContentHeightChange={setFirstHeight}
                flexStyle={firstStyle}
            />
            <QuarterContent 
                quarterFiles={props.secondFiles}
                quarter={props.secondQuarter}
                offerVerticalDropTarget={props.offerVerticalDropTarget}
                offerHorizontalDropTarget={props.offerHorizontalDropTarget}
                isOnMobile={props.isOnMobile}
                onContentHeightChange={setSecondHeight}
                flexStyle={secondStyle}
            />
        </div>
    )
}