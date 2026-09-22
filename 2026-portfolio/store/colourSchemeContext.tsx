'use client'

import { colourSchemes } from "../types/Files";
import { createContext, useContext } from "react";

interface ThemeContextValue {
    theme: colourSchemes;
    setTheme: (newTheme: colourSchemes) => void;
}

export const ThemeContext = createContext<ThemeContextValue | null>(null);

export function useThemeContext () {
    const context = useContext(ThemeContext);
    if (!context) throw new Error ('useThemeContext must be used within the provider');
    return context
}