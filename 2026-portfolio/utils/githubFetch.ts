export async function fetchReadme(owner: string, repo: string) : Promise<string> {
    const res = await fetch(`https://api.github.com/repos/${owner}/${repo}/readme`, {
        headers: {
            Accept: 'application/vnd.github.raw+json',
            Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        },
        next: {revalidate: 3600},
    });

    if (!res.ok) throw new Error(`Failed to fetch README for ${owner}/${repo}: ${res.status}`);

    return res.text();
}