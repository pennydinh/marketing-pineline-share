"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RenderPreview = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const client_id_1 = require("../helpers/client-id");
const colors_1 = require("../helpers/colors");
const get_asset_metadata_1 = require("../helpers/get-asset-metadata");
const FilePreview_1 = require("./FilePreview");
const Preview_1 = require("./Preview");
const msgStyle = {
    fontSize: 13,
    color: 'white',
    fontFamily: 'sans-serif',
    display: 'flex',
    justifyContent: 'center',
};
const errMsgStyle = {
    ...msgStyle,
    color: colors_1.LIGHT_TEXT,
};
const RenderPreview = ({ path, assetMetadata }) => {
    const fileType = (0, Preview_1.getPreviewFileType)(path);
    const src = get_asset_metadata_1.remotion_outputsBase + path;
    const connectionStatus = (0, react_1.useContext)(client_id_1.StudioServerConnectionCtx)
        .previewServerState.type;
    if (connectionStatus === 'disconnected') {
        return (0, jsx_runtime_1.jsx)("div", { style: errMsgStyle, children: "Studio server disconnected" });
    }
    return ((0, jsx_runtime_1.jsx)(FilePreview_1.FilePreview, { assetMetadata: assetMetadata, currentAsset: path, fileType: fileType, src: src }));
};
exports.RenderPreview = RenderPreview;
