"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRulerScaleRange = exports.getRulerPoints = exports.drawMarkingOnRulerCanvas = void 0;
const editor_rulers_1 = require("../state/editor-rulers");
const colors_1 = require("./colors");
const drawLabel = ({ orientation, context, label, originDistance, color, }) => {
    context.fillStyle = color;
    if (orientation === 'horizontal') {
        context.fillText(label, originDistance + 4, 16);
    }
    else {
        context.rotate(-Math.PI / 2);
        context.fillText(label, -originDistance + 4, 16);
        context.rotate(Math.PI / 2);
    }
};
const drawGradient = ({ orientation, context, originDistance, canvasHeight, canvasWidth, }) => {
    const size = 250;
    const startX = orientation === 'horizontal' ? originDistance - size / 2 : 0;
    const startY = orientation === 'horizontal' ? 0 : originDistance - size / 2;
    const endX = orientation === 'horizontal' ? originDistance + size / 2 : canvasWidth;
    const endY = orientation === 'horizontal' ? canvasHeight : originDistance + size / 2;
    const grd = context.createLinearGradient(startX, startY, endX, endY);
    grd.addColorStop(0, colors_1.BACKGROUND__TRANSPARENT);
    grd.addColorStop(0.25, colors_1.BACKGROUND);
    grd.addColorStop(0.75, colors_1.BACKGROUND);
    grd.addColorStop(1, colors_1.BACKGROUND__TRANSPARENT);
    context.fillStyle = grd;
    context.fillRect(startX, startY, endX - startX, endY - startY);
};
const drawGuide = ({ selectedGuide, scale, startMarking, context, canvasHeight, canvasWidth, orientation, originOffset, }) => {
    const originDistance = rulerValueToPosition({
        value: selectedGuide.position,
        startMarking,
        scale,
    }) +
        originOffset -
        startMarking * scale;
    drawGradient({
        canvasHeight,
        context,
        orientation,
        originDistance,
        canvasWidth,
    });
    context.strokeStyle = colors_1.SELECTED_GUIDE;
    context.lineWidth = 1;
    context.beginPath();
    if (orientation === 'horizontal' &&
        selectedGuide.orientation === 'horizontal') {
        return;
    }
    if (orientation === 'vertical' && selectedGuide.orientation === 'vertical') {
        return;
    }
    if (orientation === 'vertical' &&
        selectedGuide.orientation === 'horizontal') {
        context.moveTo(0, originDistance);
        context.lineTo(canvasWidth, originDistance);
        drawLabel({
            context,
            label: selectedGuide.position.toString(),
            originDistance,
            orientation,
            color: colors_1.SELECTED_GUIDE,
        });
    }
    else if (orientation === 'horizontal' &&
        selectedGuide.orientation === 'vertical') {
        context.moveTo(originDistance, 0);
        context.lineTo(originDistance, canvasHeight);
        drawLabel({
            context,
            label: selectedGuide.position.toString(),
            originDistance,
            orientation,
            color: colors_1.SELECTED_GUIDE,
        });
    }
    context.stroke();
};
const drawMarkingOnRulerCanvas = ({ scale, points, startMarking, originOffset, markingGaps, orientation, rulerCanvasRef, selectedGuide, canvasHeight, canvasWidth, }) => {
    const canvas = rulerCanvasRef.current;
    if (!canvas)
        return;
    const context = canvas.getContext('2d');
    if (!context)
        return;
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    context.scale(window.devicePixelRatio, window.devicePixelRatio);
    context.clearRect(0, 0, canvasWidth, canvasHeight);
    context.strokeStyle = colors_1.RULER_COLOR;
    context.lineWidth = 1;
    context.beginPath();
    points.forEach((point) => {
        context.strokeStyle = colors_1.RULER_COLOR;
        context.lineWidth = 1;
        const originDistance = point.position + originOffset - startMarking * scale;
        context.beginPath();
        if (orientation === 'horizontal') {
            context.moveTo(originDistance, 0);
            context.lineTo(originDistance, canvasHeight);
        }
        else {
            context.moveTo(0, originDistance);
            context.lineTo(canvasWidth, originDistance);
        }
        for (let i = 1; i < 5; i++) {
            const markingOffsetXY = i * markingGaps * scale;
            if (orientation === 'horizontal') {
                context.moveTo(originDistance + markingOffsetXY / 5, 0);
                context.lineTo(originDistance + markingOffsetXY / 5, 4);
            }
            else {
                context.moveTo(0, originDistance + markingOffsetXY / 5);
                context.lineTo(4, originDistance + markingOffsetXY / 5);
            }
        }
        context.stroke();
        context.font = '10px Arial, Helvetica, sans-serif';
        context.textAlign = 'left';
        context.fillStyle = colors_1.RULER_COLOR;
        drawLabel({
            orientation,
            context,
            label: point.value.toString(),
            originDistance,
            color: colors_1.RULER_COLOR,
        });
    });
    if (selectedGuide && orientation !== selectedGuide.orientation) {
        drawGuide({
            canvasHeight,
            canvasWidth,
            context,
            orientation,
            originOffset,
            scale,
            selectedGuide,
            startMarking,
        });
    }
};
exports.drawMarkingOnRulerCanvas = drawMarkingOnRulerCanvas;
const getRulerPoints = ({ rulerScaleRange, rulerMarkingGaps, scale, }) => {
    const points = [];
    const startPoint = Math.ceil(rulerScaleRange.start / rulerMarkingGaps);
    const endPoint = Math.floor(rulerScaleRange.end / rulerMarkingGaps);
    const startMarking = startPoint * rulerMarkingGaps;
    for (let i = startPoint; i <= endPoint; i++) {
        points.push({
            value: i * rulerMarkingGaps,
            position: rulerValueToPosition({
                scale,
                startMarking,
                value: i * rulerMarkingGaps,
            }),
        });
    }
    return {
        points,
        startMarking,
    };
};
exports.getRulerPoints = getRulerPoints;
const rulerValueToPosition = ({ value, startMarking, scale, }) => {
    return (value + startMarking) * scale;
};
const getRulerScaleRange = ({ canvasLength, scale, canvasSize, }) => {
    const scaleRangeBeyondCanvas = (canvasSize.width ||
        editor_rulers_1.MINIMUM_VISIBLE_CANVAS_SIZE - editor_rulers_1.MINIMUM_VISIBLE_CANVAS_SIZE) / scale;
    return {
        start: -scaleRangeBeyondCanvas,
        end: scaleRangeBeyondCanvas + canvasLength,
    };
};
exports.getRulerScaleRange = getRulerScaleRange;
