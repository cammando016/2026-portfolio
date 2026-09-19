'use client'

import { usePathname } from "next/navigation";
import { FileDataStoreProvider } from "../store/fileDataStoreContext";
import { useHomeFileDataStore } from "../store/homeFileDataStore";
import { getOrCreateProjectStore } from "../store/projectStoreRegistry";

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

    return <FileDataStoreProvider store={activeStore}>{props.children}</FileDataStoreProvider>
}