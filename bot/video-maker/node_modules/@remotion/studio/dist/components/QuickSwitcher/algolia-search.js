"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.algoliaSearch = void 0;
const no_react_1 = require("remotion/no-react");
const ALGOLIA_API_KEY = '3e42dbd4f895fe93ff5cf40d860c4a85';
const ALGOLIA_APPLICATION_ID = 'PLSDUOL1CA';
const AGOLIA_SEARCH_URL = 'https://plsduol1ca-dsn.algolia.net/1/indexes/*/queries';
const algoliaSearch = async (query) => {
    const url = new URL(AGOLIA_SEARCH_URL);
    url.searchParams.set('x-algolia-agen', encodeURIComponent('Remotion Studio DocSearch'));
    url.searchParams.set('x-algolia-api-key', ALGOLIA_API_KEY);
    url.searchParams.set('x-algolia-application-id', ALGOLIA_APPLICATION_ID);
    const { results } = await fetch(url.toString(), {
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify({
            requests: [
                {
                    query,
                    indexName: 'remotion',
                    params: 'attributesToRetrieve=["hierarchy.lvl0","hierarchy.lvl1","hierarchy.lvl2","hierarchy.lvl3","hierarchy.lvl4","hierarchy.lvl5","hierarchy.lvl6","content","type","url"]&attributesToSnippet=["hierarchy.lvl1:10","hierarchy.lvl2:10","hierarchy.lvl3:10","hierarchy.lvl4:10","hierarchy.lvl5:10","hierarchy.lvl6:10","content:10"]&hitsPerPage=20',
                },
            ],
        }),
        method: 'POST',
    }).then((res) => res.json());
    const { hits } = results[0];
    return hits
        .map((hit) => {
        var _a;
        const entries = Object.values(hit._highlightResult.hierarchy);
        const result = (_a = entries.find((value) => value.matchLevel === 'full')) !== null && _a !== void 0 ? _a : entries.find((value) => value.matchLevel === 'partial');
        const { subtitle, title } = splitMatchIntoTitleAndSubtitle(hit);
        if (!result) {
            return null;
        }
        return {
            type: 'search-result',
            id: hit.objectID,
            title: 'Should not display',
            titleLine: title,
            subtitleLine: subtitle,
            onSelected: () => {
                window.open(hit.url);
            },
        };
    })
        .filter(no_react_1.NoReactInternals.truthy);
};
exports.algoliaSearch = algoliaSearch;
const splitMatchIntoTitleAndSubtitle = (match) => {
    const main = match.type === 'content'
        ? match._highlightResult.content
        : match._highlightResult.hierarchy[match.type];
    const title = main.value;
    const subtitle = Object.entries(match._highlightResult.hierarchy)
        .filter(([level]) => level !== match.type)
        .map((value) => value[1].value)
        .join(' • ');
    return { title, subtitle };
};
