import { backgroundContent } from "../data/background";
import { educationContent } from "../data/education";
import { homeFileData } from "../data/homeFileData";
import { projectsConfig } from "../data/projectsConfig";
import { skillLogosData } from "../data/skills";
import { FileData, SearchableFile, TextContent } from "../types/Files";
import { fetchReadme } from "./githubFetch";

//Get all text content from data files in one string for searching
const flattenTextContent = (content: TextContent) : string => {
    return content.sections.flatMap(s => [s.heading, ...s.paragraphs]).join(' ');
}

//Get all labels from skills list for searching
const flattenSkills = () : string => {
    const uniqueLabels = Array.from(new Set(skillLogosData.map(s => s.label))); //Ignores duplicates for logos with options per colour theme ie github light and dark
    return uniqueLabels.join(' ');
}

//Components other than cases below aren't including in searches, so don't get any content for searching
const getDataSearchableText = (f: FileData) : string | null => {
    switch (f.contentComponent) {
        case 'aboutMe' : return flattenTextContent(backgroundContent);
        case 'education' : return flattenTextContent(educationContent);
        case 'skills' : return flattenSkills();
        default : return null;
    }
}

const buildSearchEntry = (f: FileData, route: string, storeId: string) : SearchableFile | null => {
    //Run on each file in home store, get search string or return null for unsearched components
    const text = getDataSearchableText(f);
    if (!text) return null

    return {
        key: f.key,
        fileName: f.fileName,
        fileExtension: f.fileExtension,
        route, //Stored on search entry to allow routing to search result file on click
        storeId,
        searchableText: text.toLowerCase() //case insensitive search
    }
}

//Combine all searchable files into array of search results tied to file data
export async function buildSearchIndex () : Promise<SearchableFile[]> {
    const index : SearchableFile[] = [];

    //Add each searchable file string into search index array
    homeFileData.forEach(f => {
        const entry = buildSearchEntry(f, '/about-me', 'home');
        if (entry) index.push(entry);
    });

    //Get search string out of each project read me
    //Other project files (links and screenshots) not included in search results
    for (const p of projectsConfig) {
        if (p.githubRepo) {
            try {
                const readmeContent = await fetchReadme(p.githubRepo.owner, p.githubRepo.repo);

                index.push({
                    key: `readme-${p.slug}`,
                    fileName: 'README',
                    fileExtension: 'md',
                    route: `/projects/${p.slug}`,
                    storeId: p.slug,
                    searchableText: readmeContent.toLowerCase(),
                });
            } catch { /*Do nothing if read me fetch unsuccessful*/ }
        }
    }

    return index;
}