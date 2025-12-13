import canvasModule from 'canvas';
import { ExtensionType, LoaderParserPriority, path, getFontFamilyName, extensions } from 'pixi.js';

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
    type: ExtensionType.LoadParser,
    priority: LoaderParserPriority.High
  },
  id: "node-font",
  test(url) {
    return validFonts.includes(path.extname(url).toLowerCase());
  },
  async load(url, options) {
    const name = options.data?.family ?? getFontFamilyName(url);
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
extensions.add(loadNodeFont);

export { loadNodeFont };
//# sourceMappingURL=loadNodeFont.mjs.map
