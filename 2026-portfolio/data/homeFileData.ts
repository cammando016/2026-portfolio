import { FileData } from "../types/Files";

export const homeFileData: FileData[] = [
    { key: 'background', screenQuarter: 1, fileName: 'Background', fileExtension: 'txt', lineCount: 20, fileOpen: true, activeFileInQuarter: true, contentComponent: 'aboutMe' },
    { key: 'contact', screenQuarter: 3, fileName: 'Contact Me', fileExtension: 'tsx', lineCount: 15, fileOpen: true, activeFileInQuarter: true, contentComponent: 'contactMe' },
    { key: 'education', screenQuarter: 1, fileName: 'Education', fileExtension: 'txt', lineCount: 15, fileOpen: false, activeFileInQuarter: false, contentComponent: 'education' },
    { key: 'github', screenQuarter: 2, fileName: 'Github History', fileExtension: 'tsx', lineCount: 6, fileOpen: true, activeFileInQuarter: true, contentComponent: 'githubGraph' },
    { key: 'skills', screenQuarter: 1, fileName: 'Skills', fileExtension: 'png', lineCount: 8, fileOpen: true, activeFileInQuarter: false, contentComponent: 'skills' },
];