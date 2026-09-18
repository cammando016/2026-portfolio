export type ContentComponentKey = 'aboutMe' | 'contactMe' | 'githubGraph' | 'skills' | 'readme' | 'projectLinks'

export interface FileData {
    key: string,
    screenQuarter: number,
    fileName: string,
    lineCount: number,
    fileOpen: boolean,
    activeFileInQuarter: boolean,
    contentComponent: ContentComponentKey,
    content?: string,
    projectLink? : string,
    githubLink?: string,
}