"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilePreview = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const studio_shared_1 = require("@remotion/studio-shared");
const JSONViewer_1 = require("./JSONViewer");
const TextViewer_1 = require("./TextViewer");
const layout_1 = require("./layout");
const msgStyle = {
    fontSize: 13,
    color: 'white',
    fontFamily: 'sans-serif',
    display: 'flex',
    justifyContent: 'center',
};
const FilePreview = ({ fileType, src, currentAsset, assetMetadata }) => {
    if (!assetMetadata) {
        throw new Error('expected to have assetMetadata');
    }
    if (assetMetadata.type === 'not-found') {
        throw new Error('expected to have assetMetadata, got "not-found"');
    }
    if (fileType === 'audio') {
        return (0, jsx_runtime_1.jsx)("audio", { src: src, controls: true });
    }
    if (fileType === 'video') {
        return (0, jsx_runtime_1.jsx)("video", { src: src, controls: true });
    }
    if (fileType === 'image') {
        return (0, jsx_runtime_1.jsx)("img", { src: src });
    }
    if (fileType === 'json') {
        return (0, jsx_runtime_1.jsx)(JSONViewer_1.JSONViewer, { src: src });
    }
    if (fileType === 'txt') {
        return (0, jsx_runtime_1.jsx)(TextViewer_1.TextViewer, { src: src });
    }
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("div", { style: msgStyle, children: currentAsset }), (0, jsx_runtime_1.jsx)(layout_1.Spacing, { y: 0.5 }), (0, jsx_runtime_1.jsxs)("div", { style: msgStyle, children: ["Size: ", (0, studio_shared_1.formatBytes)(assetMetadata.size), " "] })] }));
};
exports.FilePreview = FilePreview;
