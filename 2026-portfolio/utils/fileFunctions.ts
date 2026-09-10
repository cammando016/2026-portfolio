import { FileData } from "../types/Files";

export const updateFileScreenQuarter = (fileData: FileData[], fileKey: string, newQuarter: number) : FileData[] => {
    return fileData.map(f => f.key !== fileKey ? f : {...f, screenQuarter: newQuarter});
}

export const updateQuarterActiveFile = (fileData: FileData[], fileKey: string) : FileData[] => {
    const quarterOfClickedFile = fileData.find(f => f.key === fileKey)!.screenQuarter;

    return fileData.map(f => {
        if (f.key !== fileKey && f.screenQuarter !== quarterOfClickedFile) return f;
        if (f.key !== fileKey && f.screenQuarter === quarterOfClickedFile) return {...f, activeFileInQuarter: false};
        return {...f, activeFileInQuarter: true}
    })
}

export const closeFile = (fileData: FileData[], fileKey: string) : FileData[] => {
    //If another file as the one closed with the same screenQuarter is open, needs to be set as activeFileInQuarter true to display
    //Get quarter of the file that close was clicked on for this
    const closedFileQuarter = fileData.find(f => f.key === fileKey)!.screenQuarter;

    //Need key of first file in the same quarter of closed file
    //Might not exist if closed file was only one in screen quarter
    const matchingQuarterFiles = fileData.filter(f => f.key !== fileKey && f.fileOpen && f.screenQuarter === closedFileQuarter);
    const firstFileKeyMatchingQuarter = matchingQuarterFiles.length > 0 ? matchingQuarterFiles[0].key : '';

    return fileData.map(f => {
        if (f.key !== fileKey && f.key !== firstFileKeyMatchingQuarter) return f;
        if(f.key === firstFileKeyMatchingQuarter) return { ...f, activeFileInQuarter: true };
        return { ...f, screenQuarter: 0, fileOpen: false }
    })
}

export const openFile = (fileData: FileData[], fileKey: string, activeScreenQuarter: number) : FileData[] => {
    //If file is already open then do nothing
    if (fileData.find(f => f.key === fileKey)!.fileOpen) return fileData;

    return fileData.map(f => {
        //No changes for files not clicked on and in different screen quarter
        if (f.key !== fileKey && f.screenQuarter !== activeScreenQuarter) return f;
        //Set active file false if open and in same screen quarter
        if (f.key !== fileKey && f.screenQuarter === activeScreenQuarter) return { ...f, activeFileInQuarter: false };
        return { ...f, fileOpen: true, screenQuarter: activeScreenQuarter, activeFileInQuarter: true }
    })
}