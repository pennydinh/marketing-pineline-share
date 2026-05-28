"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VideoPreview = exports.getPreviewFileType = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const player_1 = require("@remotion/player");
const react_1 = require("react");
const remotion_1 = require("remotion");
const checkerboard_background_1 = require("../helpers/checkerboard-background");
const colors_1 = require("../helpers/colors");
const checkerboard_1 = require("../state/checkerboard");
const RenderPreview_1 = require("./RenderPreview");
const Spinner_1 = require("./Spinner");
const StaticFilePreview_1 = require("./StaticFilePreview");
const centeredContainer = {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
};
const label = {
    fontFamily: 'sans-serif',
    fontSize: 14,
    color: colors_1.LIGHT_TEXT,
};
const getPreviewFileType = (fileName) => {
    var _a;
    if (!fileName) {
        return 'other';
    }
    const audioExtensions = ['mp3', 'wav', 'ogg', 'aac'];
    const videoExtensions = ['mp4', 'avi', 'mkv', 'mov', 'webm'];
    const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp'];
    const fileExtension = (_a = fileName.split('.').pop()) === null || _a === void 0 ? void 0 : _a.toLowerCase();
    if (fileExtension === undefined) {
        throw new Error('File extension is undefined');
    }
    if (audioExtensions.includes(fileExtension)) {
        return 'audio';
    }
    if (videoExtensions.includes(fileExtension)) {
        return 'video';
    }
    if (imageExtensions.includes(fileExtension)) {
        return 'image';
    }
    if (fileExtension === 'json') {
        return 'json';
    }
    if (fileExtension === 'txt') {
        return 'txt';
    }
    return 'other';
};
exports.getPreviewFileType = getPreviewFileType;
const checkerboardSize = 49;
const containerStyle = (options) => {
    return {
        transform: `scale(${options.scale})`,
        marginLeft: options.xCorrection,
        marginTop: options.yCorrection,
        width: options.width,
        height: options.height,
        display: 'flex',
        position: 'absolute',
        backgroundColor: (0, checkerboard_background_1.checkerboardBackgroundColor)(options.checkerboard),
        backgroundImage: (0, checkerboard_background_1.checkerboardBackgroundImage)(options.checkerboard),
        backgroundSize: (0, checkerboard_background_1.getCheckerboardBackgroundSize)(checkerboardSize) /* Must be a square */,
        backgroundPosition: (0, checkerboard_background_1.getCheckerboardBackgroundPos)(checkerboardSize) /* Must be half of one side of the square */,
    };
};
const VideoPreview = ({ canvasSize, contentDimensions, canvasContent, assetMetadata }) => {
    if (assetMetadata && assetMetadata.type === 'not-found') {
        return ((0, jsx_runtime_1.jsx)("div", { style: centeredContainer, children: (0, jsx_runtime_1.jsx)("div", { style: label, children: "File does not exist" }) }));
    }
    if (contentDimensions === null) {
        return ((0, jsx_runtime_1.jsx)("div", { style: centeredContainer, children: (0, jsx_runtime_1.jsx)(Spinner_1.Spinner, { duration: 0.5, size: 24 }) }));
    }
    return ((0, jsx_runtime_1.jsx)(CompWhenItHasDimensions, { contentDimensions: contentDimensions, canvasSize: canvasSize, canvasContent: canvasContent, assetMetadata: assetMetadata }));
};
exports.VideoPreview = VideoPreview;
const CompWhenItHasDimensions = ({ contentDimensions, canvasSize, canvasContent, assetMetadata }) => {
    const { size: previewSize } = (0, react_1.useContext)(remotion_1.Internals.PreviewSizeContext);
    const { centerX, centerY, yCorrection, xCorrection, scale } = (0, react_1.useMemo)(() => {
        if (contentDimensions === 'none') {
            return {
                centerX: 0,
                centerY: 0,
                yCorrection: 0,
                xCorrection: 0,
                scale: 1,
            };
        }
        return player_1.PlayerInternals.calculateCanvasTransformation({
            canvasSize,
            compositionHeight: contentDimensions.height,
            compositionWidth: contentDimensions.width,
            previewSize: previewSize.size,
        });
    }, [canvasSize, contentDimensions, previewSize.size]);
    const outer = (0, react_1.useMemo)(() => {
        return {
            width: contentDimensions === 'none' ? '100%' : contentDimensions.width * scale,
            height: contentDimensions === 'none'
                ? '100%'
                : contentDimensions.height * scale,
            display: 'flex',
            flexDirection: 'column',
            position: 'absolute',
            left: centerX - previewSize.translation.x,
            top: centerY - previewSize.translation.y,
            overflow: 'hidden',
            justifyContent: canvasContent.type === 'asset' ? 'center' : 'flex-start',
            alignItems: canvasContent.type === 'asset' &&
                (0, exports.getPreviewFileType)(canvasContent.asset) === 'audio'
                ? 'center'
                : 'normal',
        };
    }, [
        contentDimensions,
        scale,
        centerX,
        previewSize.translation.x,
        previewSize.translation.y,
        centerY,
        canvasContent,
    ]);
    return ((0, jsx_runtime_1.jsx)("div", { style: outer, children: canvasContent.type === 'asset' ? ((0, jsx_runtime_1.jsx)(StaticFilePreview_1.StaticFilePreview, { assetMetadata: assetMetadata, currentAsset: canvasContent.asset })) : canvasContent.type === 'output' ? ((0, jsx_runtime_1.jsx)(RenderPreview_1.RenderPreview, { path: canvasContent.path, assetMetadata: assetMetadata })) : ((0, jsx_runtime_1.jsx)(PortalContainer, { contentDimensions: contentDimensions, scale: scale, xCorrection: xCorrection, yCorrection: yCorrection })) }));
};
const PortalContainer = ({ scale, xCorrection, yCorrection, contentDimensions }) => {
    const { checkerboard } = (0, react_1.useContext)(checkerboard_1.CheckerboardContext);
    const style = (0, react_1.useMemo)(() => {
        return containerStyle({
            checkerboard,
            scale,
            xCorrection,
            yCorrection,
            width: contentDimensions.width,
            height: contentDimensions.height,
        });
    }, [
        checkerboard,
        contentDimensions.height,
        contentDimensions.width,
        scale,
        xCorrection,
        yCorrection,
    ]);
    (0, react_1.useEffect)(() => {
        const { current } = portalContainer;
        current === null || current === void 0 ? void 0 : current.appendChild(remotion_1.Internals.portalNode());
        return () => {
            current === null || current === void 0 ? void 0 : current.removeChild(remotion_1.Internals.portalNode());
        };
    }, []);
    const portalContainer = (0, react_1.useRef)(null);
    return (0, jsx_runtime_1.jsx)("div", { ref: portalContainer, style: style });
};
