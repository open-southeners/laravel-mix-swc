import { Config } from "@swc/core";

declare module 'laravel-mix' {
    interface Api {
        /**
         * Compile JavaScript or TypeScript using SWC
         *
         * `src` may be a glob pattern
         **/
        swc(src: string | string[], output: string, options?: ConfigPreset | Config, config?: Config): Api
    }
}

export declare type ConfigPreset = 'js' | 'jsx' | 'tsx' | 'ts' | 'vue' | 'react'