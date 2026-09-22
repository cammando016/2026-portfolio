'use client'

import { ThemeContext } from "../store/colourSchemeContext";
import styles from '../styles/home-layout.module.scss';
import ActiveStoreProvider from "../components/ActiveStoreProvider";
import LinksAndIcons from "../components/LinksAndIcons";
import { useState } from "react";
import { colourSchemes } from "../types/Files";
import Footer from "./Footer";

interface Props {
    children: React.ReactNode
}

export default function AppProvider(props: Props) {
    const [theme, setTheme] = useState<colourSchemes>('light');

    return (
        <ThemeContext.Provider
            value={{theme, setTheme}}
        >
            <div className={styles.window}>
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