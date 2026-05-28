"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasIpv4LoopbackAddress = exports.hasIPv6LoopbackAddress = exports.isIpV6Supported = exports.flattenNetworkInterfaces = exports.getHostsToTry = exports.getHostToBind = exports.getPortConfig = void 0;
const os_1 = __importDefault(require("os"));
const truthy_1 = require("./truthy");
let cached = null;
const getPortConfig = (preferIpv4) => {
    if (cached) {
        return cached;
    }
    const networkInterfaces = os_1.default.networkInterfaces();
    const flattened = (0, exports.flattenNetworkInterfaces)(networkInterfaces);
    const host = (0, exports.getHostToBind)(flattened, preferIpv4);
    const hostsToTry = (0, exports.getHostsToTry)(flattened);
    const response = { host, hostsToTry };
    cached = response;
    return response;
};
exports.getPortConfig = getPortConfig;
const getHostToBind = (flattened, preferIpv4) => {
    if (preferIpv4 || !(0, exports.isIpV6Supported)(flattened)) {
        return '0.0.0.0';
    }
    return '::';
};
exports.getHostToBind = getHostToBind;
const getHostsToTry = (flattened) => {
    return [
        (0, exports.hasIPv6LoopbackAddress)(flattened) ? '::1' : null,
        (0, exports.hasIpv4LoopbackAddress)(flattened) ? '127.0.0.1' : null,
        (0, exports.isIpV6Supported)(flattened) ? '::' : null,
        '0.0.0.0',
    ].filter(truthy_1.truthy);
};
exports.getHostsToTry = getHostsToTry;
const flattenNetworkInterfaces = (networkInterfaces) => {
    const result = [];
    for (const iface in networkInterfaces) {
        for (const configuration of networkInterfaces[iface]) {
            result.push(configuration);
        }
    }
    return result;
};
exports.flattenNetworkInterfaces = flattenNetworkInterfaces;
const isIpV6Supported = (flattened) => {
    for (const configuration of flattened) {
        if (configuration.family === 'IPv6' && !configuration.internal) {
            return true;
        }
    }
    return false;
};
exports.isIpV6Supported = isIpV6Supported;
const hasIPv6LoopbackAddress = (flattened) => {
    for (const configuration of flattened) {
        if (configuration.family === 'IPv6' &&
            configuration.internal &&
            configuration.address === '::1') {
            return true;
        }
    }
    return false;
};
exports.hasIPv6LoopbackAddress = hasIPv6LoopbackAddress;
const hasIpv4LoopbackAddress = (flattened) => {
    for (const configuration of flattened) {
        if (configuration.family === 'IPv4' &&
            configuration.internal &&
            configuration.address === '127.0.0.1') {
            return true;
        }
    }
    return false;
};
exports.hasIpv4LoopbackAddress = hasIpv4LoopbackAddress;
