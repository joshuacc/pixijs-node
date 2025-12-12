import { CanvasSource, ExtensionType } from 'pixi.js';
import type { CanvasSourceOptions, ExtensionMetadata } from 'pixi.js';
import { NodeCanvasElement } from './NodeCanvasElement';

/**
 * TextureSource implementation that recognises NodeCanvasElement.
 */
export class NodeCanvasSource extends CanvasSource
{
    public static override extension: ExtensionMetadata = ExtensionType.TextureSource;

    constructor(options: CanvasSourceOptions)
    {
        super(options);
    }

    public static override test(resource: any): resource is NodeCanvasElement
    {
        return resource instanceof NodeCanvasElement;
    }
}
