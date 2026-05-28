"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setCurrentFps = exports.getCurrentFps = exports.setCurrentDuration = exports.getCurrentDuration = exports.setCurrentFrame = exports.getCurrentFrame = exports.setCurrentZoom = exports.getCurrentZoom = void 0;
let currentFrame = 0;
let currentZoom = 1;
let currentDuration = 1;
let currentFps = 1;
const getCurrentZoom = () => {
    return currentZoom;
};
exports.getCurrentZoom = getCurrentZoom;
const setCurrentZoom = (z) => {
    currentZoom = z;
};
exports.setCurrentZoom = setCurrentZoom;
const getCurrentFrame = () => {
    return currentFrame;
};
exports.getCurrentFrame = getCurrentFrame;
const setCurrentFrame = (f) => {
    currentFrame = f;
};
exports.setCurrentFrame = setCurrentFrame;
const getCurrentDuration = () => {
    return currentDuration;
};
exports.getCurrentDuration = getCurrentDuration;
const setCurrentDuration = (d) => {
    currentDuration = d;
};
exports.setCurrentDuration = setCurrentDuration;
const getCurrentFps = () => {
    return currentFps;
};
exports.getCurrentFps = getCurrentFps;
const setCurrentFps = (d) => {
    currentFps = d;
};
exports.setCurrentFps = setCurrentFps;
