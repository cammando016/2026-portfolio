'use client'

import { useThemeContext } from "../store/colourSchemeContext";
import styles from '../styles/settings.module.scss';
import { COLOUR_SCHEMES } from "../types/Files";

export default function Settings() {
    const { theme, setTheme } = useThemeContext();

    const handleChangeTheme = (e: any) => setTheme(e.target.value)

    return (
        <div className={`${styles.settingsContainer}`}>
            <h3>Settings</h3>
            <fieldset className={`${styles.themeFieldset}`}>
                <legend className={`${styles.themeLegend}`}>Update Colour Theme</legend>
                {COLOUR_SCHEMES.map(c => {
                    return (
                        <label className={styles.label} key={c}>
                            <input
                                type="radio"
                                name={c}
                                value={c}
                                checked={theme === c}
                                onChange={handleChangeTheme}
                                className={styles.radioSelector}
                            />
                            <span className={styles.span}>{c}</span>
                        </label>
                    )
                })
                }
            </fieldset>
        </div>
    )
}