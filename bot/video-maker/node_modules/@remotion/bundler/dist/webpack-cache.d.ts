type Environment = 'development' | 'production';
type CacheState = 'exists' | 'other-exists' | 'does-not-exist';
declare global {
    namespace NodeJS {
        interface ProcessVersions {
            pnp?: string;
        }
    }
}
export declare const getWebpackCacheEnvDir: (environment: Environment) => string;
export declare const getWebpackCacheName: (environment: Environment, hash: string) => string;
export declare const clearCache: (remotionRoot: string, env: Environment) => Promise<void>;
export declare const cacheExists: (remotionRoot: string, environment: Environment, hash: string) => CacheState;
export {};
