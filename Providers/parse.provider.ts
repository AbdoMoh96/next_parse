const Parse = require('parse/dist/parse.min.js');
const ParseProvider = () => {
    const PARSE_APPLICATION_ID = 'aQVpUVmgTTjaDq77uoW06m6T2Vl1IvBnOgAh9nnn';
    const PARSE_HOST_URL = 'https://parseapi.back4app.com/';
    const PARSE_JAVASCRIPT_KEY = '26UQi3ZwhYdmKr6HsNuTjdjuLI5wj995KKgy8gEB';
    Parse.initialize(PARSE_APPLICATION_ID, PARSE_JAVASCRIPT_KEY);
    Parse.serverURL = PARSE_HOST_URL;
    return Parse;
}

export default ParseProvider;