"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isServeUrl = void 0;
const isServeUrl = (potentialUrl) => {
    // Theoretically not a valid URL but handle the most basic cases of forgetting protocol in front
    if (potentialUrl.startsWith('www.') ||
        potentialUrl.includes('amazonaws.com')) {
        return true;
    }
    return (potentialUrl.startsWith('https://') || potentialUrl.startsWith('http://'));
};
exports.isServeUrl = isServeUrl;
