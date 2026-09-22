'use client'

import { ThemeContext } from "../store/colourSchemeContext";
import styles from '../styles/home-layout.module.scss';
import colourStyles from '../styles/colourThemes.module.scss';
import ActiveStoreProvider from "../components/ActiveStoreProvider";
import LinksAndIcons from "../components/LinksAndIcons";
import { useEffect, useState } from "react";
import { COLOUR_SCHEMES, colourSchemes } from "../types/Files";
import Footer from "./Footer";

interface Props {
    children: React.ReactNode
}

const THEME_STORAGE_KEY = 'portfolio-theme';

function isValidTheme(value: string | null) : value is colourSchemes {
    return COLOUR_SCHEMES.includes(value as colourSchemes);
}

export default function AppProvider(props: Props) {
    const [theme, setThemeState] = useState<colourSchemes>('light');

    useEffect(() => {
        try {
            const stored = localStorage.getItem(THEME_STORAGE_KEY);
            if (isValidTheme(stored)) setThemeState(stored);
        } catch {}
    }, []);

    const setTheme = (newTheme: colourSchemes) => {
        setThemeState(newTheme);
        localStorage.setItem(THEME_STORAGE_KEY, newTheme);
    }

    return (
        <ThemeContext.Provider
            value={{theme, setTheme}}
        >
            <div className={`${styles.window} ${colourStyles.window} `} data-theme={theme}>
            <div className={`${styles.topScreenBar} ${styles.rowFlex} `}>
                <div className={` ${styles.windowControlContainer} ${styles.windowIconRed} `}></div>
                <div className={` ${styles.windowControlContainer} ${styles.windowIconYellow} `}></div>
                <div className={` ${styles.windowControlContainer} ${styles.windowIconGreen} `}></div>
            </div>

            <div className={`${styles.homeContainer} ${styles.rowFlex}`}>
                <LinksAndIcons />
                <ActiveStoreProvider>{props.children}</ActiveStoreProvider>
            </div>

            <Footer />

            </div>
        </ThemeContext.Provider>
    )
}