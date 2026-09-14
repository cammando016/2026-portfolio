import { createFileDataStore, FileDataState } from "./createFileDataStore";
import { UseBoundStore, StoreApi } from "zustand";

const projectStores = new Map<string, UseBoundStore<StoreApi<FileDataState>>>();

export function getOrCreateProjectStore(slug: string) {
    if (!projectStores.has(slug)) {
        projectStores.set(slug, createFileDataStore([]));
    }
    return projectStores.get(slug)!;
}