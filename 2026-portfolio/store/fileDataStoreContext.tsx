'use client'

import { createContext, useContext } from "react";
import { FileDataState } from "./createFileDataStore";
import { UseBoundStore, StoreApi } from "zustand";

const FileDataStoreContext = createContext<UseBoundStore<StoreApi<FileDataState>> | null>(null);
export function FileDataStoreProvider(
    {store, children} :
    {
        store: UseBoundStore<StoreApi<FileDataState>>,
        children: React.ReactNode;
    }
) {
    return <FileDataStoreContext.Provider value={store}>{children}</FileDataStoreContext.Provider>
}

export function useCurrentFileDataStore<T>(selector: (state: FileDataState) => T) : T {
    const store = useContext(FileDataStoreContext);
    if (!store) throw new Error('useCurrentFileDataStore must be used within a FileDataStoreProvider')
    return store(selector);
}