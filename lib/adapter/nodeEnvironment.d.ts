import { ExtensionType } from 'pixi.js';
/**
 * Environment extension to enable PixiJS in Node.
 * Higher priority than the browser extension so it wins detection.
 */
export declare const nodeEnvironment: {
    extension: {
        type: ExtensionType;
        name: string;
        priority: number;
    };
    test: () => boolean;
    load: () => Promise<void>;
};
