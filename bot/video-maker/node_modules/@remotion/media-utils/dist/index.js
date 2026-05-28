"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.visualizeAudio = exports.useAudioData = exports.getWaveformPortion = exports.getVideoMetadata = exports.getAudioDurationInSeconds = exports.getAudioDuration = exports.getAudioData = exports.audioBufferToDataUrl = void 0;
var audio_url_helpers_1 = require("./audio-buffer/audio-url-helpers");
Object.defineProperty(exports, "audioBufferToDataUrl", { enumerable: true, get: function () { return audio_url_helpers_1.audioBufferToDataUrl; } });
var get_audio_data_1 = require("./get-audio-data");
Object.defineProperty(exports, "getAudioData", { enumerable: true, get: function () { return get_audio_data_1.getAudioData; } });
var get_audio_duration_in_seconds_1 = require("./get-audio-duration-in-seconds");
Object.defineProperty(exports, "getAudioDuration", { enumerable: true, get: function () { return get_audio_duration_in_seconds_1.getAudioDuration; } });
Object.defineProperty(exports, "getAudioDurationInSeconds", { enumerable: true, get: function () { return get_audio_duration_in_seconds_1.getAudioDurationInSeconds; } });
var get_video_metadata_1 = require("./get-video-metadata");
Object.defineProperty(exports, "getVideoMetadata", { enumerable: true, get: function () { return get_video_metadata_1.getVideoMetadata; } });
var get_waveform_portion_1 = require("./get-waveform-portion");
Object.defineProperty(exports, "getWaveformPortion", { enumerable: true, get: function () { return get_waveform_portion_1.getWaveformPortion; } });
__exportStar(require("./types"), exports);
var use_audio_data_1 = require("./use-audio-data");
Object.defineProperty(exports, "useAudioData", { enumerable: true, get: function () { return use_audio_data_1.useAudioData; } });
var visualize_audio_1 = require("./visualize-audio");
Object.defineProperty(exports, "visualizeAudio", { enumerable: true, get: function () { return visualize_audio_1.visualizeAudio; } });
