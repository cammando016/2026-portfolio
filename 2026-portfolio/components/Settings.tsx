'use client'

import { useThemeContext } from "../store/colourSchemeContext";
import { useShowTagsContext } from "../store/showTagsContext";
import styles from '../styles/settings.module.scss';
import codeFileStyles from '../styles/codeFile.module.scss';
import { COLOUR_SCHEMES } from "../types/Files";

export default function Settings() {
    const { theme, setTheme } = useThemeContext();
    const { showTags, toggleShowTags } = useShowTagsContext();

    const handleChangeTheme = (e: any) => setTheme(e.target.value)

    return (
        <div className={`${styles.settingsContainer}`}>
            <h1>Settings</h1>
            <br />
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
            <br />
            <fieldset className={styles.themeFieldset}>
                <legend className={styles.themeLegend}>Show Element Tags?</legend>
                <label className={styles.label}>
                    <input 
                        type="radio"
                        name="on"
                        value="true"
                        checked={showTags}
                        onChange={toggleShowTags}
                        className={styles.radioSelector}
                    />
                    <span className={styles.span}>
                        <span className={codeFileStyles.tagLabel}>{`<span>`}</span>
                        Element Tags On
                        <span className={codeFileStyles.tagLabel}>{`<span>`}</span>
                    </span>
                </label>
                <label className={styles.label}>
                    <input 
                        type="radio"
                        name="off"
                        value="false"
                        checked={!showTags}
                        onChange={toggleShowTags}
                        className={styles.radioSelector}
                    />
                    <span className={styles.span}>Element Tags Off</span>
                </label>
            </fieldset>
        </div>
    )
}