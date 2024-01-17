'use client'
import React, { useEffect } from 'react';
import { initializeParse } from  '@parse/react';
import parseConfig from "@/config/parse";

interface propTypes {
    children: React.ReactNode;
    live?: boolean;
}

const ParseProvider: React.FC<propTypes> = ({children, live}) => {

    useEffect(() => {
        initializeParse(
            live ? parseConfig.serverLiveUrl : parseConfig.serverUrl,
            parseConfig.applicationId,
            parseConfig.javascriptKey
        );
    }, []);


    return (
        <>
            {children}
        </>
    );
};

export default ParseProvider;