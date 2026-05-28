"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getShouldRenderAudio = void 0;
const codec_supports_media_1 = require("./codec-supports-media");
const getShouldRenderAudio = ({ codec, assetsInfo, enforceAudioTrack, muted, }) => {
    if (muted) {
        return 'no';
    }
    if (!(0, codec_supports_media_1.codecSupportsMedia)(codec).audio) {
        return 'no';
    }
    if (enforceAudioTrack) {
        return 'yes';
    }
    if (assetsInfo === null) {
        return 'maybe';
    }
    return assetsInfo.assets.flat(1).length > 0 ? 'yes' : 'no';
};
exports.getShouldRenderAudio = getShouldRenderAudio;
