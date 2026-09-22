'use client'

import { useThemeContext } from "../store/colourSchemeContext"
import styles from '../styles/home-layout.module.scss'

export default function Footer() {
    const {theme} = useThemeContext();
    return (
        <div className={`${styles.bottomScreenBar}`}>
            <p>Colour Scheme: {theme}</p>
        </div>
    )
}