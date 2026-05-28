"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.colorWithNewOpacity = void 0;
const colorWithNewOpacity = (color, opacity, zodTypes) => {
    const { r, g, b } = zodTypes.ZodZypesInternals.parseColor(color);
    if (opacity >= 255) {
        return `#${r.toString(16).padStart(2, '0')}${g
            .toString(16)
            .padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
    }
    return `rgba(${r}, ${g}, ${b}, ${(opacity / 255).toFixed(2)})`;
};
exports.colorWithNewOpacity = colorWithNewOpacity;
