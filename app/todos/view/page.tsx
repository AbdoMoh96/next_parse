'use client'
import React,{ useEffect } from 'react';
import Parse from 'parse';
import { useParseQuery, initializeParse } from  '@parse/react';
import parseConfig from "@/config/parse";

interface propTypes {}

const TodosView: React.FC<propTypes> = () => {

    useEffect(() => {
        initializeParse(
            parseConfig.serverLiveUrl,
            parseConfig.applicationId,
            parseConfig.javascriptKey
        );
    }, []);

    const parseQuery = new Parse.Query('ToDo');
    const {
        isLive,
        isLoading,
        isSyncing,
        results,
        count,
        error,
        reload
    } = useParseQuery(parseQuery);

    return (
        <div>
            {isLoading && (
                <p>Loading...</p>
            )}
            {isLive && (
                <p>Live!</p>
            )}
            {isSyncing && (
                <p>Syncing...</p>
            )}
            {results && (
                <ul>
                    {results.map(result => (
                        <li key={result.id}>
                            {result.get('title')}
                        </li>
                    ))}
                </ul>
            )}
            <p>{count}</p>
            {error && (
                <p>{error.message}</p>
            )}
            <button
                onClick={reload}
            >
                Reload
            </button>
        </div>
    );
}

export default TodosView;