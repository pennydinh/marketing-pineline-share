"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSilentAudio = void 0;
const call_ffmpeg_1 = require("./call-ffmpeg");
const sample_rate_1 = require("./sample-rate");
const createSilentAudio = async ({ outName, indent, logLevel, binariesDirectory, cancelSignal, chunkLengthInSeconds, }) => {
    await (0, call_ffmpeg_1.callFf)({
        bin: 'ffmpeg',
        args: [
            '-f',
            'lavfi',
            '-i',
            `anullsrc=r=${sample_rate_1.DEFAULT_SAMPLE_RATE}`,
            '-c:a',
            'pcm_s16le',
            '-t',
            String(chunkLengthInSeconds),
            '-ar',
            String(sample_rate_1.DEFAULT_SAMPLE_RATE),
            outName,
        ],
        indent,
        logLevel,
        binariesDirectory,
        cancelSignal,
    });
};
exports.createSilentAudio = createSilentAudio;
