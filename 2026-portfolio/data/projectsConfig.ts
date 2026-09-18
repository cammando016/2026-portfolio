import { FileData } from "../types/Files";

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
            {
                key: crypto.randomUUID(),
                screenQuarter: 3,
                fileName: 'Project Links',
                lineCount: 2,
                fileOpen: true,
                activeFileInQuarter: true,
                contentComponent: 'projectLinks',
                projectLink: 'https://nbateamguesser.netlify.app',
                githubLink: 'https://github.com/cammando016/nba_guessing_game'
            },
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