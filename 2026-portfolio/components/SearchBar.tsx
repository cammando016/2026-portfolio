'use client'

import styles from '../styles/home-layout.module.scss';
import contentStyles from '../styles/content.module.scss';
import globalStyles from '../styles/global.module.scss';
import { useState, useRef, useEffect } from 'react';
import { SearchableFile } from '../types/Files';
import { useSearchIndex } from '../store/searchIndexContext';
import { usePathname, useRouter } from 'next/navigation';
import { searchFiles } from '../utils/searchIndex';
import { resolveStore } from '../utils/resolveStore';
import { setPendingFileOpen } from '../utils/pendingFileOpen';

const DEBOUNCE_MS = 250;

interface Props {
    onAnyClick?: () => void,
}

export default function SearchBar (props : Props) {
    const [query, setQuery] = useState<string>('');
    const [results, setResults] = useState<SearchableFile[]>([]);
    const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const searchIndex = useSearchIndex();
    const pathname = usePathname();
    const router = useRouter();

    useEffect(() => {
        if (debounceRef.current) clearTimeout(debounceRef.current);
        debounceRef.current = setTimeout(() => {
            setResults(searchFiles(searchIndex, query, pathname, 5));
        }, DEBOUNCE_MS);

        return () => {
            if (debounceRef.current) clearTimeout(debounceRef.current);
        }
    }, [query, searchIndex, pathname]);

    const handleClickResult = (result : SearchableFile) => {
        if (result.storeId === 'settings') {
            router.push(result.route);
            props.onAnyClick?.();
            return;
        }

        if (result.route === pathname) {
            const store = resolveStore(result.storeId);
            props.onAnyClick?.();
            store?.getState().openFile(result.key);
        } else {
            setPendingFileOpen(result.key);
            router.push(result.route);
            props.onAnyClick?.();
        }
    }

    return (
        <div className={`${styles.filesPane} ${styles.linkText}`} style={{paddingLeft: '5px', paddingTop: '15px'}}>
            <p style={{marginBottom: '10px'}}>SEARCH</p>

            <input 
                type='text'
                placeholder='Search...'
                className={contentStyles.input}
                style={{maxWidth: '95%'}}
                maxLength={20}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />

            <p style={{margin: '10px 0'}}>RESULTS</p>

            {query.trim() !== '' && (
                <div>
                    {results.length === 0 ? 
                        <p>No matches found</p> :
                        results.map(r => (
                            <div 
                                key={r.key} 
                                role='button' 
                                onClick={() => handleClickResult(r)} 
                                className={globalStyles.hover}
                                style={{
                                    padding: '4px 0',
                                    cursor: 'pointer'
                                }}
                            >
                                <p style={{margin: 0}}>{`${r.fileName}${r.fileExtension && `.${r.fileExtension}`}`}</p>
                                <p style={{margin: 0, opacity: 0.6, fontSize: '0.8em'}}>{r.route}</p>
                            </div>
                        ))

                    }
                </div>
            )

            }
        </div>
    )
}