"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPortal = exports.portals = void 0;
exports.portals = [
    document.getElementById('menuportal-0'),
    document.getElementById('menuportal-1'),
    document.getElementById('menuportal-2'),
    document.getElementById('menuportal-3'),
    document.getElementById('menuportal-4'),
    document.getElementById('menuportal-5'),
];
const getPortal = (i) => {
    return exports.portals[i];
};
exports.getPortal = getPortal;
