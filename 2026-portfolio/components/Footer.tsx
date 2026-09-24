'use client'

import { useThemeContext } from "../store/colourSchemeContext"
import { useShowTagsContext } from "../store/showTagsContext";
import styles from '../styles/home-layout.module.scss'

export default function Footer() {
    const {theme} = useThemeContext();
    const {showTags} = useShowTagsContext();
    return (
        <div className={`${styles.bottomScreenBar}`}>
            <p>{`${showTags && '<p>'}Theme: ${theme}${showTags && '</p>'}`}</p>
            <p>{`${showTags && '<p>'}Show Element Tags: ${showTags ? 'On' : 'Off'}${showTags && '</p>'}`}</p>
        </div>
    )
}