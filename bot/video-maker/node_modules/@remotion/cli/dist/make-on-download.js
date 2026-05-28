"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeOnDownload = void 0;
const studio_server_1 = require("@remotion/studio-server");
const log_1 = require("./log");
const makeOnDownload = ({ indent, logLevel, updatesDontOverwrite, downloads, updateRenderProgress, isUsingParallelEncoding, }) => {
    return (src) => {
        const id = Math.random();
        const download = {
            id,
            name: src,
            progress: 0,
            downloaded: 0,
            totalBytes: null,
        };
        const nextDownloadIndex = downloads.length;
        downloads.push(download);
        log_1.Log.verbose({ indent, logLevel }, `Starting download [${nextDownloadIndex}]:`, src);
        updateRenderProgress({
            newline: false,
            printToConsole: !updatesDontOverwrite,
            isUsingParallelEncoding,
        });
        let lastUpdate = Date.now();
        return ({ percent, downloaded, totalSize }) => {
            download.progress = percent;
            download.totalBytes = totalSize;
            download.downloaded = downloaded;
            if (lastUpdate + 1000 > Date.now() && updatesDontOverwrite) {
                return;
            }
            lastUpdate = Date.now();
            log_1.Log.verbose({ indent, logLevel }, `Download [${nextDownloadIndex}]:`, percent
                ? `${(percent * 100).toFixed(1)}%`
                : studio_server_1.StudioServerInternals.formatBytes(downloaded));
            updateRenderProgress({
                newline: false,
                printToConsole: !updatesDontOverwrite,
                isUsingParallelEncoding,
            });
        };
    };
};
exports.makeOnDownload = makeOnDownload;
