import canvasModule from 'canvas';
import { ExtensionType, LoaderParserPriority, path, DOMAdapter, Texture, getResolutionOfUrl, extensions } from 'pixi.js';
import { NodeCanvasElement } from './NodeCanvasElement.mjs';

const { loadImage } = canvasModule;
const validImages = [".jpg", ".png", ".jpeg", ".svg"];
const loadNodeTexture = {
  extension: {
    type: ExtensionType.LoadParser,
    priority: LoaderParserPriority.High
  },
  id: "node-texture",
  test(url) {
    return validImages.includes(path.extname(url).toLowerCase());
  },
  async load(url, asset) {
    const data = await DOMAdapter.get().fetch(url);
    const image = await loadImage(Buffer.from(await data.arrayBuffer()));
    const canvas = new NodeCanvasElement(image.width, image.height);
    const ctx = canvas.getContext("2d");
    ctx?.drawImage(image, 0, 0);
    const texture = Texture.from(canvas, {
      resolution: getResolutionOfUrl(url),
      ...asset.data
    });
    return texture;
  },
  unload(texture) {
    texture.destroy(true);
  }
};
extensions.add(loadNodeTexture);

export { loadNodeTexture };
//# sourceMappingURL=loadNodeTexture.mjs.map
