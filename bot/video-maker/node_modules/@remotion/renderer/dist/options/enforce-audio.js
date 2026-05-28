"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.enforceAudioOption = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const DEFAULT_ENFORCE_AUDIO_TRACK = false;
let enforceAudioTrackState = DEFAULT_ENFORCE_AUDIO_TRACK;
const cliFlag = 'enforce-audio-track';
exports.enforceAudioOption = {
    name: 'Enforce Audio Track',
    cliFlag,
    description: () => ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: "Render a silent audio track if there would be none otherwise." })),
    ssrName: 'enforceAudioTrack',
    docLink: 'https://www.remotion.dev/docs/config#setenforceaudiotrack-',
    type: false,
    getValue: ({ commandLine }) => {
        if (commandLine[cliFlag]) {
            return {
                source: 'cli',
                value: true,
            };
        }
        if (enforceAudioTrackState !== DEFAULT_ENFORCE_AUDIO_TRACK) {
            return {
                source: 'config',
                value: enforceAudioTrackState,
            };
        }
        return {
            source: 'default',
            value: DEFAULT_ENFORCE_AUDIO_TRACK,
        };
    },
    setConfig: (value) => {
        enforceAudioTrackState = value;
    },
};
