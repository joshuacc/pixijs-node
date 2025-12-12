import canvasModule from 'canvas';
import { extensions, ExtensionType, Texture, path, getResolutionOfUrl, DOMAdapter, LoaderParserPriority } from 'pixi.js';
import { NodeCanvasElement } from './NodeCanvasElement';

import type { LoaderParser, ResolvedAsset } from 'pixi.js';

const { loadImage } = canvasModule;
const validImages = ['.jpg', '.png', '.jpeg', '.svg'];

/** loads our textures into a node canvas */
export const loadNodeTexture = {
    extension: {
        type: ExtensionType.LoadParser,
        priority: LoaderParserPriority.High,
    },
    id: 'node-texture',

    test(url: string): boolean
    {
        return validImages.includes(path.extname(url).toLowerCase());
    },

    async load(url: string, asset: ResolvedAsset): Promise<Texture>
    {
        const data = await DOMAdapter.get().fetch(url);
        const image = await loadImage(Buffer.from(await data.arrayBuffer()));
        const canvas = new NodeCanvasElement(image.width, image.height);
        const ctx = canvas.getContext('2d');

        ctx?.drawImage(image as unknown as CanvasImageSource, 0, 0);
        const texture = Texture.from(canvas, {
            resolution: getResolutionOfUrl(url),
            ...asset.data
        });

        return texture;
    },

    unload(texture: Texture): void
    {
        texture.destroy(true);
    }
} as LoaderParser<Texture>;

extensions.add(loadNodeTexture);
