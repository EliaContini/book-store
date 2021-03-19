/**
 * Flags Client
 *
 * @returns a querable store
 */
const flags = () => {
    const url = "https://restcountries.eu/rest/v2/alpha/";

    return {
        get: async (countryCode) => {
            const response = await fetch(url + countryCode);

            const payload = await response.json();

            return {
                name: payload.name,
                url: payload.flag,
            };
        },
    };
};

module.exports = flags;
