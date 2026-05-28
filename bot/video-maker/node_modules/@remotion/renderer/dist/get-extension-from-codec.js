"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultCodecsForFileExtension = exports.makeFileExtensionMap = exports.getFileExtensionFromCodec = void 0;
const codec_1 = require("./codec");
const file_extensions_1 = require("./file-extensions");
const getFileExtensionFromCodec = (codec, audioCodec) => {
    if (!codec_1.validCodecs.includes(codec)) {
        throw new Error(`Codec must be one of the following: ${codec_1.validCodecs.join(', ')}, but got ${codec}`);
    }
    const map = file_extensions_1.defaultFileExtensionMap[codec];
    if (audioCodec === null) {
        return map.default;
    }
    const typedAudioCodec = audioCodec;
    if (!(typedAudioCodec in map.forAudioCodec)) {
        throw new Error(`Audio codec ${typedAudioCodec} is not supported for codec ${codec}`);
    }
    return map.forAudioCodec[audioCodec].default;
};
exports.getFileExtensionFromCodec = getFileExtensionFromCodec;
const makeFileExtensionMap = () => {
    const map = {};
    Object.keys(file_extensions_1.defaultFileExtensionMap).forEach((_codec) => {
        const codec = _codec;
        const fileExtMap = file_extensions_1.defaultFileExtensionMap[codec];
        const audioCodecs = Object.keys(fileExtMap.forAudioCodec);
        const possibleExtensionsForAudioCodec = audioCodecs.map((audioCodec) => fileExtMap.forAudioCodec[audioCodec].possible);
        const allPossibleExtensions = [
            fileExtMap.default,
            ...possibleExtensionsForAudioCodec.flat(1),
        ];
        for (const extension of allPossibleExtensions) {
            if (!map[extension]) {
                map[extension] = [];
            }
            if (!map[extension].includes(codec)) {
                map[extension].push(codec);
            }
        }
    });
    return map;
};
exports.makeFileExtensionMap = makeFileExtensionMap;
exports.defaultCodecsForFileExtension = {
    '3gp': 'aac',
    aac: 'aac',
    gif: 'gif',
    hevc: 'h265',
    m4a: 'aac',
    m4b: 'aac',
    mkv: 'h264-mkv',
    mov: 'prores',
    mp3: 'mp3',
    mp4: 'h264',
    mpeg: 'aac',
    mpg: 'aac',
    mxf: 'prores',
    wav: 'wav',
    webm: 'vp8',
    ts: 'h264-ts',
};
