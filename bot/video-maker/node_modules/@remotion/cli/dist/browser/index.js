"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.browserCommand = exports.BROWSER_COMMAND = void 0;
const chalk_1 = require("../chalk");
const log_1 = require("../log");
const ensure_1 = require("./ensure");
exports.BROWSER_COMMAND = 'browser';
const printHelp = (logLevel) => {
    log_1.Log.info({ indent: false, logLevel });
    log_1.Log.info({ indent: false, logLevel }, chalk_1.chalk.blue(`remotion ${exports.BROWSER_COMMAND}`));
    log_1.Log.info({ indent: false, logLevel });
    log_1.Log.info({ indent: false, logLevel }, 'Available commands:');
    log_1.Log.info({ indent: false, logLevel }, '');
    log_1.Log.info({ indent: false, logLevel }, `remotion ${exports.BROWSER_COMMAND} ${ensure_1.ENSURE_COMMAND}`);
    log_1.Log.info({ indent: false, logLevel }, chalk_1.chalk.gray('Ensure Remotion has a browser to render.'));
};
const browserCommand = (args, logLevel) => {
    if (args[0] === ensure_1.ENSURE_COMMAND) {
        return (0, ensure_1.ensureCommand)(logLevel);
    }
    printHelp(logLevel);
};
exports.browserCommand = browserCommand;
