"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModalsContext = void 0;
const react_1 = require("react");
exports.ModalsContext = (0, react_1.createContext)({
    selectedModal: null,
    setSelectedModal: () => undefined,
});
