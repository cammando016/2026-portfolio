import { StoreApi, UseBoundStore } from "zustand";
import { FileDataState } from "../store/createFileDataStore";
import { useHomeFileDataStore } from "../store/homeFileDataStore";
import { getOrCreateProjectStore } from "../store/projectStoreRegistry";

export function resolveStore(storeId: string) : UseBoundStore<StoreApi<FileDataState>> | null {
    if (storeId === 'home') return useHomeFileDataStore;
    if (storeId === 'settings') return null;
    return getOrCreateProjectStore(storeId);
}