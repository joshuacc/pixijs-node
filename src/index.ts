import { ResizePlugin, detectMp4, detectOgv, detectWebm, loadTextures, loadWebFont, extensions, DOMAdapter } from 'pixi.js';
import { NodeAdapter } from './adapter/adapter';
import { nodeEnvironment } from './adapter/nodeEnvironment';

DOMAdapter.set(NodeAdapter);

// Register Node environment extension (higher priority than browser)
extensions.add(nodeEnvironment);

// Remove browser-only loaders/detections that rely on DOM/video/font APIs
extensions.remove(
    detectMp4,
    detectOgv,
    detectWebm,
    loadTextures,
    loadWebFont,
    ResizePlugin
);

// Export ES for those importing specifically by name
export * from './filters';
export * from 'pixi.js';
export * from './adapter';
