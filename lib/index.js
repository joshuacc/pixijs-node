'use strict';

var pixi_js = require('pixi.js');
var adapter = require('./adapter/adapter.js');
var nodeEnvironment = require('./adapter/nodeEnvironment.js');
var filters = require('./filters.js');
require('./adapter/index.js');
var loadNodeBase64 = require('./adapter/loadNodeBase64.js');
var loadNodeFont = require('./adapter/loadNodeFont.js');
var loadNodeTexture = require('./adapter/loadNodeTexture.js');
var NodeCanvasElement = require('./adapter/NodeCanvasElement.js');
var NodeCanvasSource = require('./adapter/NodeCanvasSource.js');

pixi_js.DOMAdapter.set(adapter.NodeAdapter);
pixi_js.extensions.add(nodeEnvironment.nodeEnvironment);
pixi_js.extensions.add(
  pixi_js.GraphicsPipe,
  pixi_js.GraphicsContextSystem,
  pixi_js.GlGraphicsAdaptor,
  pixi_js.TilingSpritePipe,
  pixi_js.MeshPipe,
  pixi_js.GlMeshAdaptor,
  pixi_js.FilterPipe,
  pixi_js.FilterSystem,
  pixi_js.CanvasTextSystem,
  // Text pipes are required for label rendering in headless exports.
  pixi_js.CanvasTextPipe,
  pixi_js.BitmapTextPipe,
  pixi_js.HTMLTextPipe
);
pixi_js.extensions.remove(
  pixi_js.detectMp4,
  pixi_js.detectOgv,
  pixi_js.detectWebm,
  // Keep loadTextures so Assets can decode PNGs in node via NodeAdapter image
  pixi_js.loadWebFont,
  pixi_js.ResizePlugin
);

exports.NodeAdapter = adapter.NodeAdapter;
exports.nodeEnvironment = nodeEnvironment.nodeEnvironment;
exports.filters = filters.filters;
exports.loadNodeBase64 = loadNodeBase64.loadNodeBase64;
exports.loadNodeFont = loadNodeFont.loadNodeFont;
exports.loadNodeTexture = loadNodeTexture.loadNodeTexture;
exports.NodeCanvasElement = NodeCanvasElement.NodeCanvasElement;
exports.NodeCanvasSource = NodeCanvasSource.NodeCanvasSource;
Object.keys(pixi_js).forEach(function (k) {
    if (k !== 'default' && !exports.hasOwnProperty(k)) Object.defineProperty(exports, k, {
        enumerable: true,
        get: function () { return pixi_js[k]; }
    });
});
//# sourceMappingURL=index.js.map
