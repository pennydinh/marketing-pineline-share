"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderQueueItemSubtitleStyle = void 0;
const colors_1 = require("../../helpers/colors");
const layout_1 = require("../layout");
exports.renderQueueItemSubtitleStyle = {
    fontSize: 13,
    color: colors_1.LIGHT_TEXT,
    appearance: 'none',
    border: 'none',
    padding: 0,
    cursor: 'pointer',
    lineHeight: 1.2,
    textAlign: 'left',
    whiteSpace: 'nowrap',
    marginRight: layout_1.SPACING_UNIT,
    overflowX: 'hidden',
    // size smaller than viewport causes actual ellipse
    maxWidth: 500,
    textOverflow: 'ellipsis',
};
