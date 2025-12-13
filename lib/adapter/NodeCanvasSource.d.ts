import { CanvasSource } from 'pixi.js';
import type { CanvasSourceOptions, ExtensionMetadata } from 'pixi.js';
import { NodeCanvasElement } from './NodeCanvasElement';
/**
 * TextureSource implementation that recognises NodeCanvasElement.
 */
export declare class NodeCanvasSource extends CanvasSource {
    static extension: ExtensionMetadata;
    constructor(options: CanvasSourceOptions);
    static test(resource: any): resource is NodeCanvasElement;
}
