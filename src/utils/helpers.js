module.exports = {
    arrayToQueryArray: (varName, array) => {
        if (!Array.isArray(array)) return '';

        const result = array.map((arr) => `${varName}=${arr}`);

        return result.join('&');
    },
    jsonToQueryString: (json) => {
        if (!json) return undefined;

        return `?${
            Object.keys(json).map((key) => `${encodeURIComponent(key)}=${
                encodeURIComponent(json[key])}`).join('&')}`;
    },
};
