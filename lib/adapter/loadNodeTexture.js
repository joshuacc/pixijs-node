'use strict';

var canvasModule = require('canvas');
var pixi_js = require('pixi.js');
var NodeCanvasElement = require('./NodeCanvasElement.js');

const { loadImage } = canvasModule;
const validImages = [".jpg", ".png", ".jpeg", ".svg"];
const loadNodeTexture = {
  extension: {
    type: pixi_js.ExtensionType.LoadParser,
    priority: pixi_js.LoaderParserPriority.High
  },
  id: "node-texture",
  test(url) {
    return validImages.includes(pixi_js.path.extname(url).toLowerCase());
  },
  async load(url, asset) {
    const data = await pixi_js.DOMAdapter.get().fetch(url);
    const image = await loadImage(Buffer.from(await data.arrayBuffer()));
    const canvas = new NodeCanvasElement.NodeCanvasElement(image.width, image.height);
    const ctx = canvas.getContext("2d");
    ctx?.drawImage(image, 0, 0);
    const texture = pixi_js.Texture.from(canvas, {
      resolution: pixi_js.getResolutionOfUrl(url),
      ...asset.data
    });
    return texture;
  },
  unload(texture) {
    texture.destroy(true);
  }
};
pixi_js.extensions.add(loadNodeTexture);

exports.loadNodeTexture = loadNodeTexture;
//# sourceMappingURL=loadNodeTexture.js.map
