"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toInt16 = void 0;
const toInt16 = (x) => (x > 0 ? x * 0x7fff : x * 0x8000);
exports.toInt16 = toInt16;
