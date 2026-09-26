export async function GET() {
    const query = `
        query($username: String!) {
            user(login: $username) {
                contributionsCollection {
                    contributionCalendar {
                        totalContributions
                        weeks {
                            contributionDays {
                                date
                                contributionCount
                                color
                            }
                        }
                    }
                }
            }
        }
    `;

    const res = await fetch('https://api.github.com/graphql', {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({query, variables: {username: 'cammando016'}}),
        next: { revalidate: 24 * 60 * 60 },
    });

    const data = await res.json();
    return Response.json(data.data.user.contributionsCollection.contributionCalendar);
}