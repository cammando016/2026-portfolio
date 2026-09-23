'use client'

import { ThemeContext } from "../store/colourSchemeContext";
import styles from '../styles/home-layout.module.scss';
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
        const attr = document.documentElement.getAttribute('data-theme');
        if (isValidTheme(attr) && attr !== theme) setThemeState(attr);
    }, [])

    const setTheme = (newTheme: colourSchemes) => {
        setThemeState(newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
        try {
            localStorage.setItem(THEME_STORAGE_KEY, newTheme);
        } catch {}
    }

    return (
        <ThemeContext.Provider
            value={{theme, setTheme}}
        >
            <div className={`${styles.window}`}>
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