"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setRenderJobs = exports.setUnsavedProps = exports.setCurrentCanvasContentId = void 0;
const no_react_1 = require("remotion/no-react");
let currentItemName = null;
let unsavedProps = false;
let tabInactive = false;
let renderJobs = [];
const setCurrentCanvasContentId = (id) => {
    if (!id) {
        currentItemName = id;
        updateTitle();
        return;
    }
    const idWithoutFolder = id.split('/').pop();
    currentItemName = idWithoutFolder;
    updateTitle();
};
exports.setCurrentCanvasContentId = setCurrentCanvasContentId;
const setUnsavedProps = (unsaved) => {
    window.remotion_unsavedProps = unsaved;
    unsavedProps = unsaved;
};
exports.setUnsavedProps = setUnsavedProps;
const setRenderJobs = (jobs) => {
    renderJobs = jobs;
    updateTitle();
};
exports.setRenderJobs = setRenderJobs;
document.addEventListener('visibilitychange', () => {
    tabInactive = document.visibilityState === 'hidden';
    updateTitle();
});
const productName = 'Remotion Studio';
const suffix = `- ${productName}`;
const updateTitle = () => {
    if (!currentItemName) {
        document.title = productName;
        return;
    }
    const currentCompTitle = `${currentItemName} / ${window.remotion_projectName}`;
    document.title = [
        getProgressInBrackets(currentItemName, renderJobs),
        unsavedProps && tabInactive ? '✏️' : null,
        `${currentCompTitle} ${suffix}`,
    ]
        .filter(no_react_1.NoReactInternals.truthy)
        .join(' ');
};
const getProgressInBrackets = (selectedCompositionId, jobs) => {
    const currentRender = jobs.find((job) => job.status === 'running');
    if (!currentRender) {
        return null;
    }
    if (currentRender.status !== 'running') {
        throw new Error('expected running job');
    }
    const progInPercent = Math.ceil(currentRender.progress.value * 100);
    const progressInBrackets = currentRender.compositionId === selectedCompositionId
        ? `[${progInPercent}%]`
        : `[${progInPercent}% ${currentRender.compositionId}]`;
    return progressInBrackets;
};
document.addEventListener('visibilitychange', () => {
    tabInactive = document.visibilityState === 'hidden';
    updateTitle();
});
