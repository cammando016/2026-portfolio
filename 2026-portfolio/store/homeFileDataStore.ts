import { createFileDataStore } from "./createFileDataStore";
import AboutMe from "../components/contentComponents/AboutMe";
import GithubGraph from "../components/contentComponents/GithubGraph";
import Skills from "../components/contentComponents/Skills";
import ContactMe from "../components/contentComponents/ContactMe";

export const useHomeFileDataStore = createFileDataStore([
    { key: crypto.randomUUID(), screenQuarter: 1, fileName: 'About Me', lineCount: 20, fileOpen: true, activeFileInQuarter: true, contentComponent: 'aboutMe' },
    { key: crypto.randomUUID(), screenQuarter: 2, fileName: 'Github Graph', lineCount: 6, fileOpen: true, activeFileInQuarter: true, contentComponent: 'githubGraph' },
    { key: crypto.randomUUID(), screenQuarter: 1, fileName: 'Skills', lineCount: 8, fileOpen: true, activeFileInQuarter: false, contentComponent: 'skills' },
    { key: crypto.randomUUID(), screenQuarter: 4, fileName: 'Contact', lineCount: 15, fileOpen: true, activeFileInQuarter: true, contentComponent: 'contactMe' },
])