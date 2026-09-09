import { FileData } from "../types/Files";

export const homeFileData : FileData[] = (
    [
        { key: crypto.randomUUID(), screenQuarter: 1, fileName: 'About Me', lineCount: 20, fileOpen: true, activeFileInQuarter: true },
        { key: crypto.randomUUID(), screenQuarter: 2, fileName: 'Github Graph', lineCount: 6, fileOpen: true, activeFileInQuarter: true },
        { key: crypto.randomUUID(), screenQuarter: 1, fileName: 'Spare Testing', lineCount: 8, fileOpen: true, activeFileInQuarter: false },
        { key: crypto.randomUUID(), screenQuarter: 4, fileName: 'Contact', lineCount: 15, fileOpen: true, activeFileInQuarter: true },
    ]
)