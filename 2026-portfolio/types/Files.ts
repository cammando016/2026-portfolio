import { StaticImageData } from "next/image"

export type ContentComponentKey = 'aboutMe' | 'contactMe' | 'githubGraph' | 'skills' | 'readme' | 'projectLinks' | 'screenshots' | 'education'

export interface FileData {
    key: string,
    screenQuarter: number,
    fileName: string,
    lineCount: number,
    fileOpen: boolean,
    activeFileInQuarter: boolean,
    contentComponent: ContentComponentKey,
    fileExtension: string,
    content?: string,
    projectLink? : string,
    githubLink?: string,
    screenshots? : StaticImageData[],
}

export type iconOptions = 'files' | 'settings' | 'logo' | null;

export const COLOUR_SCHEMES = ['light', 'dark', 'matrix'] as const;
export type colourSchemes = typeof COLOUR_SCHEMES[number];

export interface ContributionDay {
    date: string,
    contributionCount: number,
    color: string,
}

export interface ContributionWeek {
    contributionDays: ContributionDay[],
}

export interface ContributionCalendar {
    totalContributions: number,
    weeks: ContributionWeek[],
}

export interface LatestCommit {
    message: string,
    sha: string,
    repo: string,
    date: string,
    url: string,
}

export interface Skill {
    logo: StaticImageData,
    alt: string,
    label: string,
    theme?: colourSchemes,
}

interface ContentSection {
    heading: string,
    paragraphs: string[],
}

export interface TextContent {
    sections: ContentSection[],
}