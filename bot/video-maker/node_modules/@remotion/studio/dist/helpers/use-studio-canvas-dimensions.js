"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useStudioCanvasDimensions = void 0;
const player_1 = require("@remotion/player");
const react_1 = require("react");
const remotion_1 = require("remotion");
const useStudioCanvasDimensions = ({ canvasSize, contentDimensions, assetMetadata, }) => {
    const { size: previewSize } = (0, react_1.useContext)(remotion_1.Internals.PreviewSizeContext);
    const { centerX, centerY, scale } = (0, react_1.useMemo)(() => {
        if (contentDimensions === 'none' ||
            contentDimensions === null ||
            (assetMetadata && assetMetadata.type === 'not-found') ||
            !canvasSize) {
            return {
                centerX: previewSize.translation.x,
                centerY: previewSize.translation.y,
                scale: 1,
            };
        }
        return player_1.PlayerInternals.calculateCanvasTransformation({
            canvasSize,
            compositionHeight: contentDimensions.height,
            compositionWidth: contentDimensions.width,
            previewSize: previewSize.size,
        });
    }, [
        canvasSize,
        contentDimensions,
        previewSize.size,
        previewSize.translation.y,
        previewSize.translation.x,
        assetMetadata,
    ]);
    const canvasPosition = (0, react_1.useMemo)(() => {
        return {
            left: centerX - previewSize.translation.x,
            top: centerY - previewSize.translation.y,
            width: contentDimensions === 'none' || !contentDimensions
                ? (canvasSize === null || canvasSize === void 0 ? void 0 : canvasSize.width) || 0
                : contentDimensions.width * scale,
            height: contentDimensions === 'none' || !contentDimensions
                ? (canvasSize === null || canvasSize === void 0 ? void 0 : canvasSize.height) || 0
                : contentDimensions.height * scale,
        };
    }, [
        scale,
        centerX,
        previewSize.translation.x,
        previewSize.translation.y,
        centerY,
        canvasSize,
        contentDimensions,
    ]);
    return {
        canvasPosition,
        scale,
    };
};
exports.useStudioCanvasDimensions = useStudioCanvasDimensions;
