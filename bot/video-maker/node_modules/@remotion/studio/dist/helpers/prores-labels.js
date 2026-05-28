"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.labelProResProfile = void 0;
const labelProResProfile = (profile) => {
    if (profile === '4444') {
        return '4444';
    }
    if (profile === '4444-xq') {
        return '4444 XQ (Best)';
    }
    if (profile === 'hq') {
        return 'HQ';
    }
    if (profile === 'proxy') {
        return 'Proxy (Worst)';
    }
    if (profile === 'light') {
        return 'Light';
    }
    if (profile === 'standard') {
        return 'Standard';
    }
    throw new TypeError(`Unknown ProRes profile: ${profile}`);
};
exports.labelProResProfile = labelProResProfile;
