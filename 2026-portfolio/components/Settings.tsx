'use client'

import { useThemeContext } from "../store/colourSchemeContext";
import { useShowTagsContext } from "../store/showTagsContext";
import styles from '../styles/settings.module.scss';
import codeFileStyles from '../styles/codeFile.module.scss';
import { COLOUR_SCHEMES } from "../types/Files";
import ThemePalette from "./ThemePalette";

export default function Settings() {
    const { theme, setTheme } = useThemeContext();
    const { showTags, toggleShowTags } = useShowTagsContext();

    const handleChangeTheme = (e: any) => setTheme(e.target.value);

    const lightModeColours : string[] = [
        'white',
        '#05518b',
        '#106e86',
        '#f3f3f3',
        '#A51F26',
        '#724f94'
    ];

    const darkModeColours : string[] = [
        '#1c1c1c',
        '#8bd8fb',
        '#787878',
        '#CB846F',
        '#ffff30',
        '#212122'
    ];

    const matrixModeColours : string[] = [
        '#080808',
        '#5ba786',
        '#5ba78680',
        '#6bff73',
        'grey',
        '#212122'
    ];

    return (
        <div className={`${styles.settingsContainer}`}>
            <h1>Settings</h1>
            <br />
            <fieldset className={`${styles.themeFieldset}`}>
                <legend className={`${styles.themeLegend}`}>Update Colour Theme</legend>
                {COLOUR_SCHEMES.map(c => {
                    const paletteArray : string[] =
                        c === 'light' ? lightModeColours :
                            c === 'dark' ? darkModeColours : matrixModeColours;
                    return (
                        <label className={styles.label} style={{ backgroundColor: paletteArray[0], borderColor: paletteArray.slice(4)[0], border: theme === c ? '2px solid' : '' }} key={c}>
                            <input
                                type="radio"
                                name={c}
                                value={c}
                                checked={theme === c}
                                onChange={handleChangeTheme}
                                className={styles.radioSelector}
                            />
                            <span style={{ color: paletteArray.slice(1, 2)[0], fontWeight: theme === c ? 'bold' : '' }} className={styles.span}>{c}</span>
                            <ThemePalette colours={paletteArray.slice(1)} />
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