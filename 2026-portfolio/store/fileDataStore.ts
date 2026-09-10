import { create } from "zustand";
import { FileData } from "../types/Files";

interface FileDataState {
    fileData: FileData[],
    activeScreenQuarter: number,
    updateFileScreenQuarter: (fileKey: string, newQuarter: number) => void,
    updateQuarterActiveFile: (fileKey: string) => void,
    updateActiveScreenQuarter: (newQuarter: number) => void,
    closeFile: (fileKey: string) => void,
    openFile: (fileKey: string) => void,
}

export const useFileDataStore = create<FileDataState>((set, get) => ({
    fileData: [
        { key: crypto.randomUUID(), screenQuarter: 1, fileName: 'About Me', lineCount: 20, fileOpen: true, activeFileInQuarter: true },
        { key: crypto.randomUUID(), screenQuarter: 2, fileName: 'Github Graph', lineCount: 6, fileOpen: true, activeFileInQuarter: true },
        { key: crypto.randomUUID(), screenQuarter: 1, fileName: 'Spare Testing', lineCount: 8, fileOpen: true, activeFileInQuarter: false },
        { key: crypto.randomUUID(), screenQuarter: 4, fileName: 'Contact', lineCount: 15, fileOpen: true, activeFileInQuarter: true },
    ],

    activeScreenQuarter: 1,

    updateFileScreenQuarter: (fileKey, newQuarter) => {
        set(state => ({
            fileData: state.fileData.map(f => f.key !== fileKey ? f : { ...f, screenQuarter: newQuarter })
        }))
    },

    updateQuarterActiveFile: (fileKey) => {
        const quarterOfClickedFile = get().fileData.find(f => f.key === fileKey)!.screenQuarter;

        set(state => ({
            fileData: state.fileData.map(f => {
                if (f.key !== fileKey && f.screenQuarter !== quarterOfClickedFile) return f;
                if (f.key !== fileKey && f.screenQuarter === quarterOfClickedFile) return { ...f, activeFileInQuarter: false };
                return { ...f, activeFileInQuarter: true };
            })
        }))
    },

    updateActiveScreenQuarter: (newQuarter) => set({ activeScreenQuarter: newQuarter }),

    //Used on CodeFileNameTab components to trigger on clicking the cross button
    closeFile: (fileKey) => {
        const { fileData } = get();
        //If another file as the one closed with the same screenQuarter is open, needs to be set as activeFileInQuarter true to display
        //Get quarter of the file that close was clicked on for this
        const closedFileQuarter = fileData.find(f => f.key === fileKey)!.screenQuarter;

        //Need key of first file in the same quarter of closed file
        //Might not exist if closed file was only one in screen quarter
        const matchingQuarterFiles = fileData.filter(f => f.key !== fileKey && f.fileOpen && f.screenQuarter === closedFileQuarter);
        const firstFileKeyMatchingQuarter = matchingQuarterFiles.length > 0 ? matchingQuarterFiles[0].key : '';

        set(state => ({
            fileData: state.fileData.map(f => {
                if (f.key !== fileKey && f.key !== firstFileKeyMatchingQuarter) return f;
                if(f.key === firstFileKeyMatchingQuarter) return { ...f, activeFileInQuarter: true };
                return { ...f, screenQuarter: 0, fileOpen: false }
            })
        }))
    },

    openFile: (fileKey) => {
        const { fileData, activeScreenQuarter } = get();
        //If file is already open then do nothing
        if (fileData.find(f => f.key === fileKey)!.fileOpen) return;

        set(state => ({
            fileData: state.fileData.map(f => {
                //No changes for files not clicked on and in different screen quarter
                if (f.key !== fileKey && f.screenQuarter !== activeScreenQuarter) return f;
                //Set active file false if open and in same screen quarter
                if (f.key !== fileKey && f.screenQuarter === activeScreenQuarter) return { ...f, activeFileInQuarter: false };
                return { ...f, fileOpen: true, screenQuarter: activeScreenQuarter, activeFileInQuarter: true }
            })
        }))
    },
    
}))