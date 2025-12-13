'use strict';

var canvasModule = require('canvas');
var pixi_js = require('pixi.js');

const { registerFont } = canvasModule;
const validWeights = [
  "normal",
  "bold",
  "100",
  "200",
  "300",
  "400",
  "500",
  "600",
  "700",
  "800",
  "900"
];
const validFonts = [".woff", ".woff2", ".ttf", ".otf"];
const loadNodeFont = {
  extension: {
    type: pixi_js.ExtensionType.LoadParser,
    priority: pixi_js.LoaderParserPriority.High
  },
  id: "node-font",
  test(url) {
    return validFonts.includes(pixi_js.path.extname(url).toLowerCase());
  },
  async load(url, options) {
    const name = options.data?.family ?? pixi_js.getFontFamilyName(url);
    const weights = options.data?.weights?.filter((weight) => validWeights.includes(weight)) ?? ["normal"];
    const data = options.data ?? {};
    for (let i = 0; i < weights.length; i++) {
      const weight = weights[i];
      registerFont(url, {
        ...data,
        family: options.data?.family ?? name,
        weight
      });
    }
  }
};
pixi_js.extensions.add(loadNodeFont);

exports.loadNodeFont = loadNodeFont;
//# sourceMappingURL=loadNodeFont.js.map
