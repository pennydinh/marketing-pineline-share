"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStillFrame = exports.setStillFrame = void 0;
const no_react_1 = require("remotion/no-react");
let stillFrame = 0;
const setStillFrame = (frame) => {
    no_react_1.NoReactInternals.validateFrame({
        frame,
        durationInFrames: Infinity,
        allowFloats: false,
    });
    stillFrame = frame;
};
exports.setStillFrame = setStillFrame;
const getStillFrame = () => stillFrame;
exports.getStillFrame = getStillFrame;
