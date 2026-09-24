'use client'

import { useThemeContext } from "../store/colourSchemeContext"
import { useShowTagsContext } from "../store/showTagsContext";
import styles from '../styles/home-layout.module.scss';

export default function Footer() {
    const {theme} = useThemeContext();
    const {showTags} = useShowTagsContext();
    return (
        <div className={`${styles.bottomScreenBar}`}>
            <p>
                {showTags && <span>{`<p>`}</span>}
                {`Theme: ${theme}`}
                {showTags && <span>{`</p>`}</span>}
            </p>

            <p>
                {showTags && <span>{`<p>`}</span>}
                {`Element Tags: ${showTags ? 'On' : 'Off'}`}
                {showTags && <span>{`</p>`}</span>}
            </p>
        </div>
    )
}