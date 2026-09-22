import { createFileDataStore } from "./createFileDataStore";

export const useHomeFileDataStore = createFileDataStore([
    { key: crypto.randomUUID(), screenQuarter: 1, fileName: 'About Me', fileExtension: 'txt', lineCount: 20, fileOpen: true, activeFileInQuarter: true, contentComponent: 'aboutMe' },
    { key: crypto.randomUUID(), screenQuarter: 2, fileName: 'Github Graph', fileExtension: 'img', lineCount: 6, fileOpen: true, activeFileInQuarter: true, contentComponent: 'githubGraph' },
    { key: crypto.randomUUID(), screenQuarter: 1, fileName: 'Skills', fileExtension: 'txt', lineCount: 8, fileOpen: true, activeFileInQuarter: false, contentComponent: 'skills' },
    { key: crypto.randomUUID(), screenQuarter: 3, fileName: 'Contact', fileExtension: 'tsx', lineCount: 15, fileOpen: true, activeFileInQuarter: true, contentComponent: 'contactMe' },
])