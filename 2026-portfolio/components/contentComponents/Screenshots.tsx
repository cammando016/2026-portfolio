'use client'

import { StaticImageData } from "next/image";
import styles from '../../styles/screenshots.module.scss';
import Image from "next/image";

interface Props {
    screenshots? : StaticImageData[]
}

export default function Screenshots (props : Props) {
    if (!props.screenshots || props.screenshots.length === 0) return null;
    return (
        <div className={styles.container}>
            {props.screenshots.map((scr, i) => (
                <Image key={i} src={scr} alt={`Screenshot ${i + 1}`} className={styles.screenshot} />
            ))}
        </div>
    )
}