import { create } from 'zustand';
import { FileData } from '../types/Files';
import * as fileFuncs from '../utils/fileFunctions';

export interface FileDataState {
    fileData: FileData[],
    activeScreenQuarter: number,
    hydrated: boolean,
    hydrateFileData: (fileData: FileData[]) => void,
    updateActiveScreenQuarter: (newQuarter: number) => void,
    updateFileScreenQuarter: (fileKey: string, newQuarter: number) => void,
    updateQuarterActiveFile: (fileKey: string) => void,
    closeFile: (fileKey: string) => void,
    openFile: (fileKey: string) => void,
}

export const createFileDataStore = (initFileData: FileData[]) => {
    return create<FileDataState>((set, get) => ({
        fileData: initFileData,
        activeScreenQuarter: 1,
        hydrated: initFileData.length > 0,

        hydrateFileData: (fileData) => {
            if (get().hydrated) return;
            set({ fileData, hydrated: true })
        },

        updateActiveScreenQuarter: (newQuarter) => set({ activeScreenQuarter: newQuarter }),

        updateFileScreenQuarter: (fileKey, newQuarter) => {
            set(state => ({ fileData: fileFuncs.updateFileScreenQuarter(state.fileData, fileKey, newQuarter) }));
        },

        updateQuarterActiveFile: (fileKey) => {
            set(state => ({ fileData: fileFuncs.updateQuarterActiveFile(state.fileData, fileKey) }));
        },

        closeFile: (fileKey) => {
            set(state => ({ fileData: fileFuncs.closeFile(state.fileData, fileKey) }))
        },

        openFile: (fileKey) => {
            const { activeScreenQuarter } = get();
            set(state => ({ fileData: fileFuncs.openFile(state.fileData, fileKey, activeScreenQuarter) }))
        }
    }))
}