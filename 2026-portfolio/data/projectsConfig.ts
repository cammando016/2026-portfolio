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
    {
        slug: 'nba_guessing_game',
        title: 'NBA Guesser',
        githubRepo: { owner: 'cammando016', repo: 'nba_guessing_game'},
        staticFileData: [

        ],
    },
    {
        slug: 'calendar',
        title: 'Group Calendar',
        githubRepo: { owner: 'cammando016', repo: 'calendar'},
        staticFileData: [

        ],
    },
    {
        slug: 'gym',
        title: 'Gym Tracker',
        githubRepo: { owner: 'cammando016', repo: 'gym'},
        staticFileData: [

        ],
    },
]