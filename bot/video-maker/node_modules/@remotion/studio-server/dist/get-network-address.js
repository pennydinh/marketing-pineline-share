"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNetworkAddress = void 0;
const node_os_1 = require("node:os");
const getNetworkAddress = () => {
    for (const interfaceDetails of Object.values((0, node_os_1.networkInterfaces)())) {
        if (!interfaceDetails)
            continue;
        for (const details of interfaceDetails) {
            const { address, family, internal } = details;
            if (family === 'IPv4' && !internal)
                return address;
        }
    }
};
exports.getNetworkAddress = getNetworkAddress;
