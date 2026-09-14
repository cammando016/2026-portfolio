'use client'

import { useEffect } from "react";
import MainContentSection from "../../../components/MainContentSection";
import { getOrCreateProjectStore } from "../../../store/projectStoreRegistry"
import { FileData } from "../../../types/Files"

interface Props {
    slug: string,
    initialFileData: FileData[]
}

export default function ProjectPageClient (props : Props) {
    const useStore = getOrCreateProjectStore(props.slug);
    const hydrateFileData = useStore(state => state.hydrateFileData);

    useEffect(() => {
        hydrateFileData(props.initialFileData);
    }, []);

    const fileData = useStore(state => state.fileData);
    return <MainContentSection fileData={fileData} />
}