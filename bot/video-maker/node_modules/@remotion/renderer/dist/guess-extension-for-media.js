"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.guessExtensionForVideo = void 0;
const call_ffmpeg_1 = require("./call-ffmpeg");
const guessExtensionForVideo = async ({ src, indent, logLevel, binariesDirectory, cancelSignal, }) => {
    const { stderr } = await (0, call_ffmpeg_1.callFf)({
        bin: 'ffprobe',
        args: [src],
        indent,
        logLevel,
        binariesDirectory,
        cancelSignal,
    });
    if (stderr.includes('Audio: mp3,')) {
        return 'mp3';
    }
    if (stderr.includes('Video: vp9')) {
        return 'webm';
    }
    if (stderr.includes('Video: vp8')) {
        return 'webm';
    }
    if (stderr.includes('wav, ')) {
        return 'wav';
    }
    if (stderr.includes('Video: h264')) {
        return 'mp4';
    }
    throw new Error(`The media file "${src}" has no file extension and the format could not be guessed. Tips: a) Ensure this is a valid video or audio file b) Add a file extension to the URL like ".mp4" c) Set a "Content-Type" or "Content-Disposition" header if possible.`);
};
exports.guessExtensionForVideo = guessExtensionForVideo;
