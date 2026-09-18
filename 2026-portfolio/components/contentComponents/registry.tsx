import { ComponentType } from "react";
import ProjectLinks from "./ProjectLinks";
import ReadmeViewer from "./ReadmeViewer";
import AboutMe from "./AboutMe";
import ContactMe from "./ContactMe";
import GithubGraph from "./GithubGraph";
import Skills from "./Skills";
import Screenshots from "./Screenshots";
import { ContentComponentKey } from "../../types/Files";
import { StaticImageData } from "next/image";

export const contentComponentRegistry : Record<ContentComponentKey, ComponentType<{
    content? : string,
    projectLink? : string,
    githubLink? : string,
    screenshots? : StaticImageData[],
}>> = {
    projectLinks: ProjectLinks,
    readme: ReadmeViewer,
    aboutMe: AboutMe,
    contactMe: ContactMe,
    githubGraph: GithubGraph,
    skills: Skills,
    screenshots: Screenshots
}