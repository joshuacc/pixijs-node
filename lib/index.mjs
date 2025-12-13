import {
  DOMAdapter,
  extensions,
  detectMp4,
  detectOgv,
  detectWebm,
  loadWebFont,
  ResizePlugin,
  GraphicsPipe,
  GraphicsContextSystem,
  GlGraphicsAdaptor,
  TilingSpritePipe,
  MeshPipe,
  GlMeshAdaptor,
  FilterPipe,
  FilterSystem
} from 'pixi.js';
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
// Ensure graphics/tiling/mesh render pipes are registered in node (not guaranteed by default bundle)
extensions.add(
  GraphicsPipe,
  GraphicsContextSystem,
  GlGraphicsAdaptor,
  TilingSpritePipe,
  MeshPipe,
  GlMeshAdaptor,
  FilterPipe,
  FilterSystem
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
