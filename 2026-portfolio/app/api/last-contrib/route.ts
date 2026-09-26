async function fetchLastCommit(owner: string) {
    const res = await fetch(`https://api.github.com/users/${owner}/events/public`, {
        headers: {
            Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        },
        next: {revalidate: 3600}
    });

    if (!res.ok) throw new Error(`Failed to fetch latest commit from ${owner}`);

    const events = await res.json();
    const pushEvent = events.find((e: any) => e.type === 'PushEvent');
    if(!pushEvent) return null;

    const repoName = pushEvent.repo.name;
    const commitSha = pushEvent.payload.head;

    if (!commitSha) return null;

    const commitRes = await fetch (`http://api.github.com/repos/${repoName}/commits/${commitSha}`, {
        headers: {
            Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        },
        next: { revalidate: 3600 }
    });

    if (!commitRes.ok) return null;

    const latestCommit = await commitRes.json();

    return {
        message: latestCommit.commit.message,
        sha: commitSha,
        repo: repoName,
        date: pushEvent.created_at,
        url: `https://github.com/${repoName}/commit/${commitSha}`,
    };
}

export async function GET() {
    try {
        const commit = await fetchLastCommit('cammando016');
        return Response.json(commit);
    } catch (error) {
        console.error(error)
        return Response.json({error: 'Failed to fetch latest commit'}, {status: 500});
    }
}