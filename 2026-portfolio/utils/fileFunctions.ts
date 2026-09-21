import { FileData } from "../types/Files";

export const updateFileScreenQuarter = (fileData: FileData[], fileKey: string, newQuarter: number) : FileData[] => {
    const quarterMovedFrom = fileData.find(f => f.key === fileKey)!.screenQuarter;

    const matchingQuarterFiles = fileData.filter(f => f.key !== fileKey && f.screenQuarter === quarterMovedFrom && f.fileOpen);
    const firstFileMatchingQuarterMovedFrom = matchingQuarterFiles.length > 0 ? matchingQuarterFiles[0].key : '';
    
    return fileData.map(f => {
        if (f.key !== fileKey && f.screenQuarter !== quarterMovedFrom && f.screenQuarter !== newQuarter) return f;
        if (f.key !== fileKey && f.screenQuarter === newQuarter) return {...f, activeFileInQuarter: false};
        if (f.key === firstFileMatchingQuarterMovedFrom) return {...f, activeFileInQuarter: true};
        return { ...f, screenQuarter: newQuarter, activeFileInQuarter: true}
    })
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

//Move files that have an empty quarter above, or empty half to the left to fill first available quarter
//If 1 or 3 are empty, files in 2 or 4 are moved up respectively
//If 1 & 2 are empty, files in 3 or 4 are moved left
export const fillEmptyQuartersAboveAndLeft = (fileData: FileData[], activeScreenQuarter: number) : { fileData: FileData[], activeScreenQuarter: number} => {
    let result = fileData;

    const hasFilesInQuarter = (data: FileData[], quarter: number) => data.some(f => f.fileOpen && f.screenQuarter === quarter);

    if (!hasFilesInQuarter(result, 1) && hasFilesInQuarter(result, 2)) {
        result = result.map(f => (f.fileOpen && f.screenQuarter === 2) ? {...f, screenQuarter: 1} : f );
    }

    if (!hasFilesInQuarter(result, 3) && hasFilesInQuarter(result, 4)) {
        result = result.map(f => (f.fileOpen && f.screenQuarter === 4) ? {...f, screenQuarter: 3} : f );
    }

    if (!hasFilesInQuarter(result, 1) && !hasFilesInQuarter(result, 2)) {
        result = result.map(f => {
            if (!f.fileOpen) return f;
            if (f.screenQuarter === 3) return {...f, screenQuarter: 1};
            if (f.screenQuarter === 4) return {...f, screenQuarter: 2};
            return f
        })
    }

    //Check if the last interacted screen quarter still has files open, otherwise default to 1
    const newActiveScreenQuarter = hasFilesInQuarter(result, activeScreenQuarter) ? activeScreenQuarter : 1;

    return {fileData: result, activeScreenQuarter: newActiveScreenQuarter};
}