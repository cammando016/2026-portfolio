import { FileData } from "../types/Files";
import nbaScreenshot0 from '../assets/nbaScreenshot0.png';
import nbaScreenshot1 from '../assets/nbaScreenshot1.png';
import nbaScreenshot2 from '../assets/nbaHomeMobile.png';
import nbaScreenshot3 from '../assets/nbaGameplayMobile.png';
import nbaScreenshot4 from '../assets/nbaGameoverMobile.png';
import calendarScreenshot0 from '../assets/calendarSignUp.png';
import calendarScreenshot1 from '../assets/calendarLogin.png';
import calendarScreenshot2 from '../assets/calendarMonthView.png';
import calendarScreenshot3 from '../assets/calendarYearView.png';
import calendarScreenshot4 from '../assets/calendarEditAccount.png';
import calendarScreenshot5 from '../assets/calendarAccountRecovery.png';
import calendarScreenshot6 from '../assets/calendarEventList.png';
import calendarScreenshot7 from '../assets/calendarCreateEvent.png';
import calendarScreenshot8 from '../assets/calendarGroupList.png';
import calendarScreenshot9 from '../assets/calendarEditGroup.png';
import resumeScreenshot0 from '../assets/resumeScreenshot0.png';

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
            {
                key: crypto.randomUUID(),
                screenQuarter: 3,
                fileName: 'Project Links',
                lineCount: 2,
                fileOpen: true,
                activeFileInQuarter: true,
                contentComponent: 'projectLinks',
                projectLink: 'https://c-anderson-resume.netlify.app/#education-section',
                githubLink: 'https://github.com/cammando016/resume-draft'
            },
            {
                key: crypto.randomUUID(),
                screenQuarter: 4,
                fileName: 'Project Screenshots',
                lineCount: 0,
                fileOpen: true,
                activeFileInQuarter: true,
                contentComponent: 'screenshots',
                screenshots: [resumeScreenshot0]
            }
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
                screenshots: [nbaScreenshot0, nbaScreenshot1, nbaScreenshot2, nbaScreenshot3, nbaScreenshot4]
            }
        ],
    },
    {
        slug: 'calendar',
        title: 'Group Calendar',
        githubRepo: { owner: 'cammando016', repo: 'calendar'},
        staticFileData: [
            {
                key: crypto.randomUUID(),
                screenQuarter: 3,
                fileName: 'Project Links',
                lineCount: 2,
                fileOpen: true,
                activeFileInQuarter: true,
                contentComponent: 'projectLinks',
                projectLink: 'https://calendar-1-xauw.onrender.com',
                githubLink: 'https://github.com/cammando016/calendar'
            },
            {
                key: crypto.randomUUID(),
                screenQuarter: 4,
                fileName: 'Project Screenshots',
                lineCount: 0,
                fileOpen: true,
                activeFileInQuarter: true,
                contentComponent: 'screenshots',
                screenshots: [calendarScreenshot0, calendarScreenshot1, calendarScreenshot2, calendarScreenshot3, calendarScreenshot4, calendarScreenshot5, calendarScreenshot6, calendarScreenshot7, calendarScreenshot8, calendarScreenshot9 ]
            }
        ],
    },
    {
        slug: 'gym',
        title: 'Gym Tracker',
        githubRepo: { owner: 'cammando016', repo: 'gym'},
        staticFileData: [
            {
                key: crypto.randomUUID(),
                screenQuarter: 3,
                fileName: 'Project Links',
                lineCount: 2,
                fileOpen: true,
                activeFileInQuarter: true,
                contentComponent: 'projectLinks',
                githubLink: 'https://github.com/cammando016/gym'
            },
        ],
    },
]