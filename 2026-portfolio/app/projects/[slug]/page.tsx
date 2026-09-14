import { projectsConfig } from "../../../data/projectsConfig";
import { FileData } from "../../../types/Files";
import { fetchReadme } from "../../../utils/githubFetch";
import ProjectPageClient from "./ProjectPageClient";
import ReadmeViewer from "../../../components/contentComponents/ReadmeViewer";

export function generateStaticParams() { return projectsConfig.map(p => ({slug: p.slug})); }

interface Props {
    params: Promise<{slug: string}>,
}

export default async function ProjectPage(props : Props) {
    const { slug } = await props.params;

    const project = projectsConfig.find(p => p.slug === slug);
    if (!project) throw new Error(`No project config for slug: ${slug}`);

    let fileData : FileData[] = [...project.staticFileData];

    if (project.githubRepo) {
        const readmeContent = await fetchReadme(project.githubRepo.owner, project.githubRepo.repo);

        const readmeFile: FileData = {
            key: crypto.randomUUID(),
            screenQuarter: 1,
            fileName: 'README',
            lineCount: readmeContent.split(`n`).length,
            fileOpen: true,
            activeFileInQuarter: true,
            contentComponent: ReadmeViewer,
            content: readmeContent,
        };

        fileData = [readmeFile, ...fileData];

        return <ProjectPageClient slug={slug} initialFileData={fileData} />
    }
}