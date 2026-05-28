import type { Compiler } from 'webpack';
export declare class AllowOptionalDependenciesPlugin {
    filter(error: Error): boolean;
    apply(compiler: Compiler): void;
}
