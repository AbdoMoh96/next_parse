const parseConfig  = {
    serverUrl : process.env.NEXT_PUBLIC_PARSE_SERVER_URL ?? '',
    applicationId : process.env.NEXT_PUBLIC_PARSE_APPLICATION_ID ?? '',
    javascriptKey : process.env.NEXT_PUBLIC_PARSE_JAVASCRIPT_KEY ?? ''
};

export default parseConfig;