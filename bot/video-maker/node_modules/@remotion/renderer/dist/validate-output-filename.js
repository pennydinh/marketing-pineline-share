"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateOutputFilename = void 0;
const file_extensions_1 = require("./file-extensions");
const audio_codec_1 = require("./options/audio-codec");
const validateOutputFilename = ({ codec, audioCodecSetting, extension, preferLossless, separateAudioTo, }) => {
    if (!file_extensions_1.defaultFileExtensionMap[codec]) {
        throw new TypeError(`The codec "${codec}" is not supported. Supported codecs are: ${Object.keys(file_extensions_1.defaultFileExtensionMap).join(', ')}`);
    }
    const map = file_extensions_1.defaultFileExtensionMap[codec];
    const resolvedAudioCodec = (0, audio_codec_1.resolveAudioCodec)({
        codec,
        preferLossless,
        setting: audioCodecSetting,
        separateAudioTo,
    });
    if (resolvedAudioCodec === null) {
        if (extension !== map.default) {
            throw new TypeError(`When using the ${codec} codec, the output filename must end in .${map.default}.`);
        }
        return;
    }
    if (!(resolvedAudioCodec in map.forAudioCodec)) {
        throw new Error(`Audio codec ${resolvedAudioCodec} is not supported for codec ${codec}`);
    }
    const acceptableExtensions = map.forAudioCodec[resolvedAudioCodec].possible;
    if (!acceptableExtensions.includes(extension) &&
        !separateAudioTo) {
        throw new TypeError(`When using the ${codec} codec with the ${resolvedAudioCodec} audio codec, the output filename must end in one of the following: ${acceptableExtensions.join(', ')}.`);
    }
};
exports.validateOutputFilename = validateOutputFilename;
