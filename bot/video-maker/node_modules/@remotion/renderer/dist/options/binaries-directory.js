"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.binariesDirectoryOption = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const cliFlag = 'binaries-directory';
let currentDirectory = null;
exports.binariesDirectoryOption = {
    name: 'Binaries Directory',
    cliFlag,
    description: () => ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: ["The directory where the platform-specific binaries and libraries that Remotion needs are located. Those include an ", (0, jsx_runtime_1.jsx)("code", { children: "ffmpeg" }), " and", ' ', (0, jsx_runtime_1.jsx)("code", { children: "ffprobe" }), " binary, a Rust binary for various tasks, and various shared libraries. If the value is set to ", (0, jsx_runtime_1.jsx)("code", { children: "null" }), ", which is the default, then the path of a platform-specific package located at", ' ', (0, jsx_runtime_1.jsx)("code", { children: "node_modules/@remotion/compositor-*" }), " is selected.", (0, jsx_runtime_1.jsx)("br", {}), "This option is useful in environments where Remotion is not officially supported to run like bundled serverless functions or Electron."] })),
    ssrName: 'binariesDirectory',
    docLink: 'https://www.remotion.dev/docs/renderer',
    type: '',
    getValue: ({ commandLine }) => {
        if (commandLine[cliFlag] !== undefined) {
            return {
                source: 'cli',
                value: commandLine[cliFlag],
            };
        }
        if (currentDirectory !== null) {
            return {
                source: 'config',
                value: currentDirectory,
            };
        }
        return {
            source: 'default',
            value: null,
        };
    },
    setConfig: (value) => {
        currentDirectory = value;
    },
};
