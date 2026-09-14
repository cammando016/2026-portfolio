import { FileData } from "../types/Files";
import AboutMe from "../components/contentComponents/AboutMe";

export interface ProjectConfig {
    slug: string,
    title: string,
    githubRepo?: {
        owner: string,
        repo: string
    },
    staticFileData: FileData[],
}

export const projectsConfig: ProjectConfig[] = [
    {
        slug: 'resume-draft',
        title: 'Resume',
        githubRepo: { owner: 'cammando016', repo: 'resume-draft'},
        staticFileData: [
            
        ],
    },
]