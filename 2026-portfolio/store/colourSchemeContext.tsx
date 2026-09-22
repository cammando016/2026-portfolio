'use client'

import { colourSchemes } from "../types/Files";
import { createContext, useContext } from "react";

export const ThemeContext = createContext<colourSchemes>('light');