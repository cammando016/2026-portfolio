'use client'

import { useEffect, useState } from "react";
import styles from '../../styles/github.module.scss';
import codeFileStyles from '../../styles/codeFile.module.scss';
import { ContributionCalendar, LatestCommit } from "../../types/Files";
import { useShowTagsContext } from "../../store/showTagsContext";

const getIntencityLevel = (count: number) => {
    if (count === 0) return 0;
    if (count <= 3) return 1;
    if (count <= 6) return 2;
    if (count <= 9) return 3;
    return 4;
}

export default function GithubGraph () {
    const [calendar, setCalendar] = useState<ContributionCalendar | null>(null);
    const [latestCommit, setLatestCommit] = useState<LatestCommit | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const { showTags } = useShowTagsContext();

    useEffect(() => {
        Promise.all([
            fetch('/api/contributions').then(res => res.json()),
            fetch('/api/last-contrib').then(res => res.json()),
        ]).then(([calendarData, commitData]) => {
            setCalendar(calendarData);
            setLatestCommit(commitData);
        }).catch(() => {
            setError('Unable to load GitHub history');
        }).finally(() => {
            setLoading(false);
        })
    }, []);

    console.log(latestCommit);

    if (loading) return <p className={styles.status}>Loading contributions...</p>
    if (error || !calendar) return <p className={styles.status}>{error ?? 'No data available'}</p>

    return (
        <div className={styles.graphContainer}>
            <h3>
                {showTags && <span className={codeFileStyles.tagLabel}>{`<h3>`}</span>}
                Contribution History
                {showTags && <span className={codeFileStyles.tagLabel}>{`</h3>`}</span>}
            </h3>
            <p className={styles.total}>{`${calendar.totalContributions} contributions in the past year ->`}</p>
            <div className={styles.grid}>
                {
                    calendar.weeks.map((w, i) => (
                        <div key={i} className={styles.week}>
                            {
                                w.contributionDays.map(d => (
                                    <div 
                                        key={d.date}
                                        title={`${d.contributionCount} contributions on ${d.date}`}
                                        className={styles.day}
                                        style={{ backgroundColor: `var(--contribLevel${getIntencityLevel(d.contributionCount)})` }}
                                    />
                                ))
                            }
                        </div>
                    ))
                }
            </div>

            {latestCommit &&
                <div style={{margin: '20px 0px'}}>
                    <h3>
                        {showTags && <span className={codeFileStyles.tagLabel}>{`<h3>`}</span>}
                        Latest Commit
                        {showTags && <span className={codeFileStyles.tagLabel}>{`</h3>`}</span>}
                    </h3>
                    <p>
                        {showTags && <span className={codeFileStyles.tagLabel}>{`<p>`}</span>}
                        Repo: {latestCommit.repo}
                        {showTags && <span className={codeFileStyles.tagLabel}>{`</p>`}</span>}
                    </p>
                    <p>
                        {showTags && <span className={codeFileStyles.tagLabel}>{`<p>`}</span>}
                        Date: {latestCommit.date.slice(0, 10)}
                        {showTags && <span className={codeFileStyles.tagLabel}>{`</p>`}</span>}
                    </p>
                    <p>
                        {showTags && <span className={codeFileStyles.tagLabel}>{`<p>`}</span>}
                        Message: {latestCommit.message}
                        {showTags && <span className={codeFileStyles.tagLabel}>{`</p>`}</span>}
                    </p>
                </div>
            }
        </div>
    )
}