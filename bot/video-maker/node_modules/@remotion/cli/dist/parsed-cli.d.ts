import type { CommandLineOptions } from './parse-command-line';
export declare const BooleanFlags: string[];
export declare const parsedCli: CommandLineOptions & {
    _: string[];
};
export declare const quietFlagProvided: () => boolean;
