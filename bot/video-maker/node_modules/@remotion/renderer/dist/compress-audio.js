"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.compressAudio = void 0;
const node_fs_1 = require("node:fs");
const call_ffmpeg_1 = require("./call-ffmpeg");
const audio_codec_1 = require("./options/audio-codec");
const parse_ffmpeg_progress_1 = require("./parse-ffmpeg-progress");
const truthy_1 = require("./truthy");
const compressAudio = async ({ audioCodec, outName, binariesDirectory, indent, logLevel, audioBitrate, cancelSignal, inName, onProgress, chunkLengthInSeconds, fps, }) => {
    var _a;
    if (audioCodec === 'pcm-16') {
        (0, node_fs_1.cpSync)(inName, outName);
        return onProgress(1);
    }
    const args = [
        ['-hide_banner'],
        ['-i', inName],
        ['-c:a', (0, audio_codec_1.mapAudioCodecToFfmpegAudioCodecName)(audioCodec)],
        audioCodec === 'aac' ? ['-f', 'adts'] : null,
        audioCodec ? ['-b:a', audioBitrate || '320k'] : null,
        audioCodec === 'aac' ? '-cutoff' : null,
        audioCodec === 'aac' ? '18000' : null,
        ['-y', outName],
    ]
        .filter(truthy_1.truthy)
        .flat(2);
    const task = (0, call_ffmpeg_1.callFf)({
        bin: 'ffmpeg',
        args,
        indent,
        logLevel,
        binariesDirectory,
        cancelSignal,
    });
    (_a = task.stderr) === null || _a === void 0 ? void 0 : _a.on('data', (data) => {
        const utf8 = data.toString('utf8');
        const parsed = (0, parse_ffmpeg_progress_1.parseFfmpegProgress)(utf8, fps);
        if (parsed !== undefined) {
            onProgress(parsed / (chunkLengthInSeconds * fps));
        }
    });
    await task;
};
exports.compressAudio = compressAudio;
