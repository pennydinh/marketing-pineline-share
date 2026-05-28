"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateOffthreadVideoCacheSizeInBytes = exports.offthreadVideoCacheSizeInBytesOption = exports.getOffthreadVideoCacheSizeInBytes = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
let offthreadVideoCacheSizeInBytes = null;
const getOffthreadVideoCacheSizeInBytes = () => {
    return offthreadVideoCacheSizeInBytes;
};
exports.getOffthreadVideoCacheSizeInBytes = getOffthreadVideoCacheSizeInBytes;
const cliFlag = 'offthreadvideo-cache-size-in-bytes';
exports.offthreadVideoCacheSizeInBytesOption = {
    name: 'OffthreadVideo cache size',
    cliFlag,
    description: () => ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: ["From v4.0, Remotion has a cache for", ' ', (0, jsx_runtime_1.jsx)("a", { href: "https://remotion.dev/docs/offthreadvideo", children: (0, jsx_runtime_1.jsx)("code", { children: "<OffthreadVideo>" }) }), ' ', "frames. The default is ", (0, jsx_runtime_1.jsx)("code", { children: "null" }), ", corresponding to half of the system memory available when the render starts.", (0, jsx_runtime_1.jsx)("br", {}), " This option allows to override the size of the cache. The higher it is, the faster the render will be, but the more memory will be used.", (0, jsx_runtime_1.jsx)("br", {}), "The used value will be printed when running in verbose mode.", (0, jsx_runtime_1.jsx)("br", {}), "Default: ", (0, jsx_runtime_1.jsx)("code", { children: "null" })] })),
    ssrName: 'offthreadVideoCacheSizeInBytes',
    docLink: 'https://www.remotion.dev/docs/offthreadvideo',
    type: 0,
    getValue: ({ commandLine }) => {
        if (commandLine[cliFlag] !== undefined) {
            return {
                source: 'cli',
                value: commandLine[cliFlag],
            };
        }
        if (offthreadVideoCacheSizeInBytes !== null) {
            return {
                source: 'config',
                value: offthreadVideoCacheSizeInBytes,
            };
        }
        return {
            source: 'default',
            value: null,
        };
    },
    setConfig: (size) => {
        offthreadVideoCacheSizeInBytes = size !== null && size !== void 0 ? size : null;
    },
};
const validateOffthreadVideoCacheSizeInBytes = (option) => {
    if (option === undefined || option === null) {
        return;
    }
    if (typeof option !== 'number') {
        throw new Error('Expected a number');
    }
    if (option < 0 || option === 0) {
        throw new Error('Expected a positive number');
    }
    if (Number.isNaN(option)) {
        throw new Error('Expected a number');
    }
    if (!Number.isFinite(option)) {
        throw new Error('Expected a finite number');
    }
    if (option % 1 !== 0) {
        throw new Error('Expected a whole number');
    }
};
exports.validateOffthreadVideoCacheSizeInBytes = validateOffthreadVideoCacheSizeInBytes;
