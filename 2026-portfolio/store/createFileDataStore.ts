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
    collapseAllToQuarter: (targetQuarter: number) => void,
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
            const { fileData, activeScreenQuarter } = get();
            const result = fileFuncs.fillEmptyQuartersAboveAndLeft(
                fileFuncs.updateFileScreenQuarter(fileData, fileKey, newQuarter),
                activeScreenQuarter
            );
            set({fileData: result.fileData, activeScreenQuarter: result.activeScreenQuarter});
        },

        updateQuarterActiveFile: (fileKey) => {
            set(state => ({ fileData: fileFuncs.updateQuarterActiveFile(state.fileData, fileKey) }));
        },

        closeFile: (fileKey) => {
            const { fileData, activeScreenQuarter } = get();
            const result = fileFuncs.fillEmptyQuartersAboveAndLeft(
                fileFuncs.closeFile(fileData, fileKey),
                activeScreenQuarter
            );
            set({fileData: result.fileData, activeScreenQuarter: result.activeScreenQuarter});

        },

        openFile: (fileKey) => {
            const { fileData, activeScreenQuarter } = get();
            const result = fileFuncs.fillEmptyQuartersAboveAndLeft(
                fileFuncs.openFile(fileData, fileKey, activeScreenQuarter),
                activeScreenQuarter
            );
            set({fileData: result.fileData, activeScreenQuarter: result.activeScreenQuarter});
        },

        collapseAllToQuarter: (targetQuarter) => {
            set(state => ({ fileData: fileFuncs.collapseAllToQuarter(state.fileData, targetQuarter) }))
        }
    }))
}