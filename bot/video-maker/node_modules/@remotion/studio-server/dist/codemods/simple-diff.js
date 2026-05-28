"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.simpleDiff = void 0;
const findDeletions = ({ oldLines, newLines, }) => {
    const linesChecked = [];
    let totalDeletions = 0;
    for (const line of oldLines) {
        if (linesChecked.includes(line)) {
            continue;
        }
        const timesInNewLines = newLines.filter((l) => l === line).length;
        const timesInOldLines = oldLines.filter((l) => l === line).length;
        const deletions = Math.max(0, timesInOldLines - timesInNewLines);
        totalDeletions += deletions;
        linesChecked.push(line);
    }
    return totalDeletions;
};
const findAdditions = ({ oldLines, newLines, }) => {
    const linesChecked = [];
    let totalAdditions = 0;
    for (const line of newLines) {
        if (linesChecked.includes(line)) {
            continue;
        }
        const timesInNewLines = newLines.filter((l) => l === line).length;
        const timesInOldLines = oldLines.filter((l) => l === line).length;
        const additions = Math.max(0, timesInNewLines - timesInOldLines);
        totalAdditions += additions;
        linesChecked.push(line);
    }
    return totalAdditions;
};
const simpleDiff = ({ oldLines, newLines, }) => {
    const deletions = findDeletions({ oldLines, newLines });
    const additions = findAdditions({ oldLines, newLines });
    return { deletions, additions };
};
exports.simpleDiff = simpleDiff;
