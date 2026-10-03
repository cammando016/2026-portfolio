'use client'

import { usePathname } from "next/navigation";
import { FileDataStoreProvider } from "../store/fileDataStoreContext";
import { useHomeFileDataStore } from "../store/homeFileDataStore";
import { getOrCreateProjectStore } from "../store/projectStoreRegistry";
import { useEffect } from "react";
import { consumePendingFileOpen } from "../utils/pendingFileOpen";

interface Props {
    children: React.ReactNode
}

export default function ActiveStoreProvider(props : Props) {
    const pathname = usePathname();

    const projectSlugMatch = pathname.match(/^\/projects\/([^/]+)/);
    const slug = projectSlugMatch ? projectSlugMatch[1] : null;

    const homeStore = useHomeFileDataStore;
    const projectStore = getOrCreateProjectStore(slug ?? '__none__');

    const activeStore = slug ? projectStore : homeStore;

    useEffect(() => {
        const pendingKey = consumePendingFileOpen();
        if (pendingKey) activeStore.getState().openFile(pendingKey);
    }, [activeStore]);

    return <FileDataStoreProvider store={activeStore}>{props.children}</FileDataStoreProvider>
}