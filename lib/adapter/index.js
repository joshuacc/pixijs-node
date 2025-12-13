'use strict';

require('./polyfills.js');
var pixi_js = require('pixi.js');
var NodeCanvasSource = require('./NodeCanvasSource.js');
require('canvas');
require('cross-fetch');
require('fs');
require('gl');
require('@xmldom/xmldom');
var nodeEnvironment = require('./nodeEnvironment.js');
var loadNodeBase64 = require('./loadNodeBase64.js');
var loadNodeFont = require('./loadNodeFont.js');
var loadNodeTexture = require('./loadNodeTexture.js');

pixi_js.extensions.add(NodeCanvasSource.NodeCanvasSource);

exports.NodeCanvasSource = NodeCanvasSource.NodeCanvasSource;
exports.nodeEnvironment = nodeEnvironment.nodeEnvironment;
exports.loadNodeBase64 = loadNodeBase64.loadNodeBase64;
exports.loadNodeFont = loadNodeFont.loadNodeFont;
exports.loadNodeTexture = loadNodeTexture.loadNodeTexture;
//# sourceMappingURL=index.js.map
