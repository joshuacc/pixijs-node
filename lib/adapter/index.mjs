import './polyfills.mjs';
import { extensions } from 'pixi.js';
import { NodeCanvasSource } from './NodeCanvasSource.mjs';
import 'canvas';
import 'cross-fetch';
import 'fs';
import 'gl';
import '@xmldom/xmldom';
export { nodeEnvironment } from './nodeEnvironment.mjs';
export { loadNodeBase64 } from './loadNodeBase64.mjs';
export { loadNodeFont } from './loadNodeFont.mjs';
export { loadNodeTexture } from './loadNodeTexture.mjs';

extensions.add(NodeCanvasSource);

export { NodeCanvasSource };
//# sourceMappingURL=index.mjs.map
