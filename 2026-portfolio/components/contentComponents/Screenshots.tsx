'use client'

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { StaticImageData } from "next/image";
import styles from '../../styles/screenshots.module.scss';
import Image from "next/image";

interface Props {
    screenshots? : StaticImageData[]
}

const SCROLL_TIMER : number = 4000;

export default function Screenshots (props : Props) {
    const [screenshotIndex, setScreenshotIndex] = useState<number>(0);
    const [isPaused, setIsPaused] = useState<boolean>(false);
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const screenshots = props.screenshots ?? [];

    const nextScreenshot = useCallback(() => {
        setScreenshotIndex(i => (i === screenshots.length - 1 ? 0 : i + 1))
    }, [screenshots.length]);

    const prevScreenshot = useCallback(() => {
        setScreenshotIndex(i => (i === 0 ? screenshots.length - 1 : 1 - 1))
    }, [screenshots.length]);

    const resetTimer = useCallback(() => {
        if (intervalRef.current) clearInterval(intervalRef.current);
        if (screenshots.length <= 1 || isPaused) return;
        intervalRef.current = setInterval(nextScreenshot, SCROLL_TIMER);
    }, [nextScreenshot, screenshots.length, isPaused]);

    useEffect(() => {
        resetTimer();
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        }
    }, [resetTimer]);

    const handleManualScroll = (action: () => void) => {
        action();
        resetTimer();
    }

    if (!props.screenshots || props.screenshots.length === 0) return null;

    return (
        <div className={styles.carousel} onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)} >
            <div className={`${styles.screenshotWrapper}`}>
                {screenshots.length > 1 &&
                    <button onClick={() => handleManualScroll(prevScreenshot)} className={`${styles.navButton} ${styles.prev}`} aria-label="Previous Screenshot" >
                        {'‹'}
                    </button>
                }
                <Image src={screenshots[screenshotIndex]} alt={`Screenshot ${screenshotIndex + 1}`} className={styles.screenshot} priority={screenshotIndex === 0} />
                {screenshots.length > 1 &&
                    <button onClick={() => handleManualScroll(nextScreenshot)} className={`${styles.navButton} ${styles.next}`} aria-label="Next Screenshot" >
                        {'›'}
                    </button>
                }
            </div>

            {screenshots.length > 1 &&
                <div className={`${styles.dots}`}>
                    {screenshots.map((_, i) => (
                        <button key={i} onClick={() => handleManualScroll(() => setScreenshotIndex(i))} className={`${styles.dot} ${i === screenshotIndex ? styles.dotActive : ''}`} aria-label={`Go to screenshot ${i + 1}`} />
                    ))}
                </div>
            }
        </div>
    )
}