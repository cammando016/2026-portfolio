'use client'

import { ThemeContext } from "../store/colourSchemeContext";
import { ShowTagsContext } from "../store/showTagsContext";
import { SearchIndexContext } from "../store/searchIndexContext";

import ActiveStoreProvider from "../components/ActiveStoreProvider";
import LinksAndIcons from "../components/LinksAndIcons";
import Footer from "./Footer";

import styles from '../styles/home-layout.module.scss';

import { useEffect, useState } from "react";
import { COLOUR_SCHEMES, colourSchemes, SearchableFile } from "../types/Files";

interface Props {
    searchIndex: SearchableFile[],
    children: React.ReactNode,
}

const THEME_STORAGE_KEY = 'portfolio-theme';
const SHOW_TAGS_STORAGE_KEY = 'portfolio-show-tags';

function isValidTheme(value: string | null) : value is colourSchemes {
    return COLOUR_SCHEMES.includes(value as colourSchemes);
}

export default function AppProvider(props: Props) {
    const [theme, setThemeState] = useState<colourSchemes>('light');
    const [showTags, setShowTagsState] = useState<boolean>(true);

    useEffect(() => {
        const attr = document.documentElement.getAttribute('data-theme');
        if (isValidTheme(attr) && attr !== theme) setThemeState(attr);

        const showTagsAttr = document.documentElement.getAttribute('data-show-tags');
        if (showTagsAttr === 'true' || showTagsAttr === 'false') setShowTagsState(showTagsAttr === 'true');
    }, [])

    const setTheme = (newTheme: colourSchemes) => {
        setThemeState(newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
        try {
            localStorage.setItem(THEME_STORAGE_KEY, newTheme);
        } catch {}
    }

    const toggleShowTags = () => {
        setShowTagsState(prev => {
            const next = !prev;
            document.documentElement.setAttribute('data-show-tags', String(next));
            try {
                localStorage.setItem(SHOW_TAGS_STORAGE_KEY, String(next));
            } catch {}
            return next;
        })
    }

    return (
        <ThemeContext.Provider value={{theme, setTheme}} >
            <ShowTagsContext.Provider value={{showTags, toggleShowTags}} >
                <SearchIndexContext.Provider value={props.searchIndex} >
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
                </SearchIndexContext.Provider>
            </ShowTagsContext.Provider>
        </ThemeContext.Provider>
    )
}