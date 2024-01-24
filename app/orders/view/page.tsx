'use client'
import React from 'react';
import { Button } from "antd";
import Parse from 'parse';
import { useParseQuery } from  '@parse/react';
import ParseProvider from "@/Providers/ParseProvider/ParseProvider";
import LogoutButton from "@/Components/LogoutButton/LogoutButton";

interface propTypes {}

const TodosView: React.FC<propTypes> = () => {

    ParseProvider({live: true});

    const parseQuery = new Parse.Query('orders');
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
        <>
        <LogoutButton/>
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
                            {result.get('item_name')} - {result.get('amount')}
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
        </>
    );
}

export default TodosView;