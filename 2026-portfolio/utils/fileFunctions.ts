import { FileData } from "../types/Files";

export const updateFileScreenQuarter = (fileData: FileData[], fileKey: string, newQuarter: number) : FileData[] => {
    const draggedFile : FileData = fileData.find(f => f.key === fileKey)!;
    const quarterMovedFrom : number = draggedFile.screenQuarter;

    if (quarterMovedFrom === newQuarter) return fileData;

    const wasActiveBeforeDrag : boolean = draggedFile.activeFileInQuarter;
    const matchingQuarterFiles : FileData[] = fileData.filter(f => f.key !== fileKey && f.screenQuarter === quarterMovedFrom && f.fileOpen);
    const firstFileMatchingQuarterMovedFrom : string = matchingQuarterFiles.length > 0 ? matchingQuarterFiles[0].key : '';
    
    return fileData.map(f => {
        if (f.key === fileKey) return { ...f, screenQuarter: newQuarter, activeFileInQuarter: true}
        if (wasActiveBeforeDrag && f.key === firstFileMatchingQuarterMovedFrom) return {...f, activeFileInQuarter: true}
        if (f.screenQuarter === newQuarter) return {...f, activeFileInQuarter: false}
        return f;
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
    const closedFileQuarter : number = fileData.find(f => f.key === fileKey)!.screenQuarter;
    const closedWasActive : boolean = fileData.find(f => f.key === fileKey)!.activeFileInQuarter;

    //Need key of first file in the same quarter of closed file
    //Might not exist if closed file was only one in screen quarter
    const matchingQuarterFiles = fileData.filter(f => f.key !== fileKey && f.fileOpen && f.screenQuarter === closedFileQuarter);
    const firstFileKeyMatchingQuarter = matchingQuarterFiles.length > 0 ? matchingQuarterFiles[0].key : '';

    return fileData.map(f => {
        if(f.key === fileKey) return {...f, screenQuarter: 0, fileOpen: false, activeFileInQuarter: false}
        if (closedWasActive && f.key === firstFileKeyMatchingQuarter) return {...f, activeFileInQuarter: true}
        return f;
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

    //After moving files, each quarter should only have a max of one active file in quarter
    for (const quarter of [1, 2, 3, 4]) {
        const activeFilesInQuarter = result.filter(f => f.fileOpen && f.screenQuarter === quarter && f.activeFileInQuarter);
        if(activeFilesInQuarter.length > 1) {
            const keyOfKeptFile = activeFilesInQuarter[0].key;
            result = result.map(f => 
                (f.fileOpen && f.screenQuarter === quarter && f.activeFileInQuarter && f.key !== keyOfKeptFile)
                    ? { ...f, activeFilesInQuarter: false }
                    : f
            )
        }
    }

    //Check if the last interacted screen quarter still has files open, otherwise default to 1
    const newActiveScreenQuarter = hasFilesInQuarter(result, activeScreenQuarter) ? activeScreenQuarter : 1;

    return {fileData: result, activeScreenQuarter: newActiveScreenQuarter};
}

export const collapseAllToQuarter = (fileData: FileData[], targetQuarter: number) : FileData[] => {
    const openFiles = fileData.filter(f => f.fileOpen);
    if (openFiles.length === 0) return fileData;

    return fileData.map((f, i) => {
        if (!f.fileOpen) return f;
        if (i === 0) return {
            ...f,
            activeFileInQuarter: true,
            screenQuarter: targetQuarter
        }
        return {
            ...f,
            activeFileInQuarter: false,
            screenQuarter: targetQuarter
        }
    })
}