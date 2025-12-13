import {
    ResizePlugin,
    detectMp4,
    detectOgv,
    detectWebm,
    loadTextures,
    loadWebFont,
    extensions,
    DOMAdapter,
    GraphicsPipe,
    GraphicsContextSystem,
    GlGraphicsAdaptor,
    TilingSpritePipe,
    MeshPipe,
    GlMeshAdaptor,
    FilterPipe,
    FilterSystem,
    CanvasTextPipe,
    BitmapTextPipe,
    HTMLTextPipe,
    CanvasTextSystem,
} from 'pixi.js';
import { NodeAdapter } from './adapter/adapter';
import { nodeEnvironment } from './adapter/nodeEnvironment';

DOMAdapter.set(NodeAdapter);

// Register Node environment extension (higher priority than browser)
extensions.add(nodeEnvironment);

// Ensure graphics render pipe is registered in node (not guaranteed by default bundle)
extensions.add(
    GraphicsPipe,
    GraphicsContextSystem,
    GlGraphicsAdaptor,
    TilingSpritePipe,
    MeshPipe,
    GlMeshAdaptor,
    FilterPipe,
    FilterSystem,
    CanvasTextSystem,
    // Text pipes are required for label rendering in headless exports.
    CanvasTextPipe,
    BitmapTextPipe,
    HTMLTextPipe
);

// Remove browser-only loaders/detections that rely on DOM/video/font APIs
extensions.remove(
    detectMp4,
    detectOgv,
    detectWebm,
    // Keep loadTextures so Assets can decode PNGs in node via NodeAdapter image
    loadWebFont,
    ResizePlugin
);

// Export ES for those importing specifically by name
export * from './filters';
export * from 'pixi.js';
export * from './adapter';
