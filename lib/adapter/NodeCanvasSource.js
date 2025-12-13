'use strict';

var pixi_js = require('pixi.js');
var NodeCanvasElement = require('./NodeCanvasElement.js');

class NodeCanvasSource extends pixi_js.CanvasSource {
  constructor(options) {
    super(options);
  }
  static test(resource) {
    return resource instanceof NodeCanvasElement.NodeCanvasElement;
  }
}
NodeCanvasSource.extension = pixi_js.ExtensionType.TextureSource;

exports.NodeCanvasSource = NodeCanvasSource;
//# sourceMappingURL=NodeCanvasSource.js.map
