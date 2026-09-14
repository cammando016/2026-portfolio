import { ComponentType } from "react";

export interface FileData {
    key: string,
    screenQuarter: number,
    fileName: string,
    lineCount: number,
    fileOpen: boolean,
    activeFileInQuarter: boolean,
    contentComponent: ComponentType<{ content? : string }>,
    content?: string,
}