/**
 * Book Stores Client
 *
 * @param {object} params
 * @param {string} params.host - the host exposing API. Default "localhost"
 * @param {number} params.port - the port of the host. Default 3000
 * @param {string} params.protocol - the connection protocol. Default "http"
 *
 * @returns a querable store
 */

import flags from "./flags";

const bookStores = (params) => {
    let host = "localhost";
    let port = 3000;
    let protocol = "http";

    if (params != null) {
        if (params.host != null) {
            host = params.host;
        }

        if (params.port != null) {
            port = params.port;
        }

        if (params.protocol != null) {
            protocol = params.protocol;
        }
    }

    const url = [protocol, "://", host, ":", port, "/"].join("");

    const flagsStore = flags();

    const fetchOptions = {
        headers: {
            "Content-Type": "application/vnd.api+json",
        },
    };

    return {
        get: async (params) => {
            const response = await fetch(url + "stores", fetchOptions);

            return response.json();
        },
        prepare: async (response) => {
            const bookStores = response.data;
            const included = response.included;

            const filterIncluded = (id, type) => {
                return included.filter((item) => {
                    if (item.id === id && item.type === type) {
                        return true;
                    }

                    return false;
                });
            };

            const mapBookAuthor = (item) => {
                const attributes = item.attributes;
                const relationships = item.relationships;

                //
                // Assuming there is only one author per book
                //
                // if there are multiple authors, I need to refactor this part
                //
                const author = relationships.author.data;
                let book = {
                    author: filterIncluded(author.id, author.type).map(
                        (item) => {
                            return item.attributes.fullName;
                        }
                    )[0],
                    copiesSold: attributes.copiesSold,
                    id: item.id,
                    name: attributes.name,
                };

                return book;
            };

            const top2 = (bestSellers) => {
                const sortedByCopiesSoldDesc = [...bestSellers].sort((a, b) => {
                    if (a.copiesSold > b.copiesSold) {
                        return -1;
                    }

                    if (a.copiesSold < b.copiesSold) {
                        return 1;
                    }

                    return 0;
                });

                return sortedByCopiesSoldDesc.slice(0, 2);
            };

            let prepared = bookStores.map((item) => {
                const attributes = item.attributes;
                const relationships = item.relationships;

                let bookStore = {
                    bestSellers: [],
                    countryCode: null,
                    countryFlag: null,
                    establishmentDate: attributes.establishmentDate,
                    id: item.id,
                    name: attributes.name,
                    rating: attributes.rating,
                    storeImage: attributes.storeImage,
                    website: attributes.website,
                };

                // #region ----------------------------------------------- books
                const books =
                    relationships.books == null ? [] : relationships.books.data;
                let book = null;
                let bestSellers = [];
                for (let i = 0; i < books.length; i++) {
                    book = books[i];

                    bestSellers = bestSellers.concat(
                        filterIncluded(book.id, book.type)
                    );
                }

                bestSellers = bestSellers.map(mapBookAuthor);
                bookStore.bestSellers = top2(bestSellers);
                // #endregion --------------------------------------------------

                // #region ------------------------------------------------ flag
                const countries = relationships.countries.data;
                const country = filterIncluded(countries.id, countries.type)[0];
                bookStore.countryCode = country.attributes.code;
                // #endregion --------------------------------------------------

                return bookStore;
            });

            let preparedBookStore = null;
            for (let i = 0; i < prepared.length; i++) {
                preparedBookStore = prepared[i];
                preparedBookStore.countryFlag = await flagsStore.get(
                    preparedBookStore.countryCode
                );
            }

            return prepared;
        },
        update: async (bookStore) => {
            //
            // it is specific for rating only
            //
            var payload = {
                data: {
                    type: "stores",
                    id: bookStore.id,
                    attributes: {
                        rating: bookStore.rating,
                    },
                },
            };

            const fetchOptionsUpdate = {
                ...fetchOptions,
                body: JSON.stringify(payload),
                method: "PATCH",
            };

            const response = await fetch(
                url + "stores/" + bookStore.id,
                fetchOptionsUpdate
            );

            return response.json();
        },
    };
};

export default bookStores;
