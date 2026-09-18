import { FileData } from "../types/Files";
import nbaScreenshot0 from '../assets/nbaScreenshot0.png';
import nbaScreenshot1 from '../assets/nbaScreenshot1.png';

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
            {
                key: crypto.randomUUID(),
                screenQuarter: 4,
                fileName: 'Project Screenshots',
                lineCount: 0,
                fileOpen: true,
                activeFileInQuarter: true,
                contentComponent: 'screenshots',
                screenshots: [nbaScreenshot0, nbaScreenshot1]
            }
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