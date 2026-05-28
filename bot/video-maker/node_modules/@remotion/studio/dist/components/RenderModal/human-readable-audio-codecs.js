"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.humanReadableAudioCodec = void 0;
const humanReadableAudioCodec = (audioCodec) => {
    if (audioCodec === 'aac') {
        return 'AAC';
    }
    if (audioCodec === 'mp3') {
        return 'MP3';
    }
    if (audioCodec === 'pcm-16') {
        return 'Lossless';
    }
    if (audioCodec === 'opus') {
        return 'Opus';
    }
};
exports.humanReadableAudioCodec = humanReadableAudioCodec;
