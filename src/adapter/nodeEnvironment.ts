import { ExtensionType, DOMAdapter } from 'pixi.js';
import { NodeAdapter } from './adapter';

/**
 * Environment extension to enable PixiJS in Node.
 * Higher priority than the browser extension so it wins detection.
 */
export const nodeEnvironment = {
    extension: {
        type: ExtensionType.Environment,
        name: 'node',
        priority: -2,
    },
    test: () => typeof window === 'undefined' || typeof document === 'undefined',
    load: async () =>
    {
        DOMAdapter.set(NodeAdapter);
    },
};
