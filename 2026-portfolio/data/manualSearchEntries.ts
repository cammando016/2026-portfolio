import { SearchableFile } from "../types/Files";

export const settingsSearchEntries : SearchableFile[] = [
    {
        key: 'settings',
        fileName: 'Settings',
        fileExtension: '',
        route: '/settings',
        storeId: 'settings',
        searchableText: 'settings theme colour color light dark matrix mode html tags element hide show toggle'
    }
];

export const githubSearchEntries : SearchableFile[] = [
    {
        key: 'github',
        fileName: 'Github History',
        fileExtension: 'tsx',
        route: '/about-me',
        storeId: 'home',
        searchableText: 'github history contrib contributions latest commit repo message'
    }
];

export const contactSearchEntries : SearchableFile[] = [
    {
        key: 'contact',
        fileName: 'Contact Me',
        fileExtension: 'tsx',
        route: '/about-me',
        storeId: 'home',
        searchableText: 'contact me email address company subject message receive cc send'
    }
];