'use client'
import React, { useEffect } from 'react';
import { initializeParse } from  '@parse/react';
import parseConfig from "@/config/parse";

interface propTypes {
    children: React.ReactNode;
}

const ParseProvider: React.FC<propTypes> = ({children}) => {

    useEffect(() => {
        initializeParse(
            parseConfig.serverUrl,
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