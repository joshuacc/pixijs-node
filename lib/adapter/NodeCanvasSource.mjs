import { ExtensionType, CanvasSource } from 'pixi.js';
import { NodeCanvasElement } from './NodeCanvasElement.mjs';

class NodeCanvasSource extends CanvasSource {
  constructor(options) {
    super(options);
  }
  static test(resource) {
    return resource instanceof NodeCanvasElement;
  }
}
NodeCanvasSource.extension = ExtensionType.TextureSource;

export { NodeCanvasSource };
//# sourceMappingURL=NodeCanvasSource.mjs.map
