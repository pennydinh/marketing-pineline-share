"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.throwIfSiteExistsOption = void 0;
const DEFAULT = false;
const cliFlag = 'throw-if-site-exists';
exports.throwIfSiteExistsOption = {
    cliFlag,
    description: () => `Prevents accidential update of an existing site. If there are any files in the subfolder where the site should be placed, the function will throw.`,
    docLink: 'https://remotion.dev/docs/lambda/deploy-site',
    getValue: ({ commandLine }) => {
        if (commandLine[cliFlag]) {
            return {
                source: 'cli',
                value: commandLine[cliFlag],
            };
        }
        return {
            source: 'default',
            value: DEFAULT,
        };
    },
    name: 'Throw if site exists',
    setConfig: () => {
        throw new Error('Not implemented');
    },
    ssrName: 'throwIfSiteExists',
    type: false,
};
