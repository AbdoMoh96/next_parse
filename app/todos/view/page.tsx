'use client'
import React from 'react';
import { Button } from "antd";
import Parse from 'parse';
import { useParseQuery } from  '@parse/react';
import ParseProvider from "@/Providers/ParseProvider/ParseProvider";

interface propTypes {}

const TodosView: React.FC<propTypes> = () => {

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
        <ParseProvider live={true}>
        <div className="container">
        <div className="form_container">
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
            <Button
                onClick={reload}
                style={{ marginTop: 16 }}
                type="primary"
            >
                Reload
            </Button>
        </div>
        </div>
        </ParseProvider>
    );
}

export default TodosView;