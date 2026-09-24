'use client'

import { createContext, useContext } from "react";

interface TagsContextValue {
    showTags: boolean,
    toggleShowTags: () => void,
}

export const ShowTagsContext = createContext<TagsContextValue | null>(null);

export function useShowTagsContext () {
    const context = useContext(ShowTagsContext);
    if (!context) throw new Error ('useShowTagsContext must be used within the provider')
    return context;
}