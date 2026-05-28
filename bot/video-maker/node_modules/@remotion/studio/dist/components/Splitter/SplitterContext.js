"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SplitterContext = void 0;
const react_1 = __importDefault(require("react"));
exports.SplitterContext = react_1.default.createContext({
    flexValue: 1,
    domRect: null,
    setFlexValue: () => undefined,
    isDragging: { current: false },
    orientation: 'horizontal',
    maxFlex: 1,
    minFlex: 1,
    defaultFlex: 1,
    id: '--',
    persistFlex: () => undefined,
});
