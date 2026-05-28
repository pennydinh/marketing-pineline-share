"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizeServeUrl = void 0;
const normalizeServeUrl = (unnormalized) => {
    const hasQuery = unnormalized.includes('?');
    if (hasQuery) {
        return (0, exports.normalizeServeUrl)(unnormalized.substr(0, unnormalized.indexOf('?')));
    }
    const endsInIndexHtml = unnormalized.endsWith('index.html');
    if (endsInIndexHtml) {
        return unnormalized;
    }
    // Ends with slash
    if (unnormalized.endsWith('/')) {
        return `${unnormalized}index.html`;
    }
    return `${unnormalized}/index.html`;
};
exports.normalizeServeUrl = normalizeServeUrl;
