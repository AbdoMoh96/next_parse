'use client'
import React, { useEffect } from 'react';
import { initializeParse } from  '@parse/react';
import parseConfig from "@/config/parse";

interface propTypes {
    live?: boolean;
}

const ParseProvider: React.FC<propTypes> = ({ live = false}) => {
    useEffect(() => {
        initializeParse(
            live ? parseConfig.serverLiveUrl : parseConfig.serverUrl,
            parseConfig.applicationId,
            parseConfig.javascriptKey
        );
    }, []);
    return null;
};

export default ParseProvider;