import { DOMAdapter, extensions, GraphicsPipe, GraphicsContextSystem, GlGraphicsAdaptor, TilingSpritePipe, MeshPipe, GlMeshAdaptor, FilterPipe, FilterSystem, CanvasTextSystem, CanvasTextPipe, BitmapTextPipe, HTMLTextPipe, detectMp4, detectOgv, detectWebm, loadWebFont, ResizePlugin } from 'pixi.js';
export * from 'pixi.js';
import { NodeAdapter } from './adapter/adapter.mjs';
import { nodeEnvironment } from './adapter/nodeEnvironment.mjs';
export { filters } from './filters.mjs';
import './adapter/index.mjs';
export { loadNodeBase64 } from './adapter/loadNodeBase64.mjs';
export { loadNodeFont } from './adapter/loadNodeFont.mjs';
export { loadNodeTexture } from './adapter/loadNodeTexture.mjs';
export { NodeCanvasElement } from './adapter/NodeCanvasElement.mjs';
export { NodeCanvasSource } from './adapter/NodeCanvasSource.mjs';

DOMAdapter.set(NodeAdapter);
extensions.add(nodeEnvironment);
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
extensions.remove(
  detectMp4,
  detectOgv,
  detectWebm,
  // Keep loadTextures so Assets can decode PNGs in node via NodeAdapter image
  loadWebFont,
  ResizePlugin
);

export { NodeAdapter, nodeEnvironment };
//# sourceMappingURL=index.mjs.map
