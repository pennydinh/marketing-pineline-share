"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const beeped = {};
const playBeepSound = async (renderId) => {
    if (beeped[renderId]) {
        return;
    }
    beeped[renderId] = true;
    const beepAudio = new Audio('/beep.wav');
    try {
        await beepAudio.play();
    }
    catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error playing beep sound:', error);
        throw error;
    }
};
exports.default = playBeepSound;
