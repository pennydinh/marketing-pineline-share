import type { LogLevel } from '@remotion/renderer';
import type { PromptObject } from 'prompts';
type Question<V extends string = string> = PromptObject<V> & {
    optionsPerPage?: number;
};
type NamelessQuestion = Omit<Question<'value'>, 'name'>;
export declare function selectAsync(question: NamelessQuestion, logLevel: LogLevel): Promise<string | string[]>;
export {};
