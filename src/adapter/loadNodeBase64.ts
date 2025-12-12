import canvasModule from 'canvas';
import { extensions, ExtensionType, Texture, getResolutionOfUrl, LoaderParserPriority } from 'pixi.js';
import { NodeCanvasElement } from './NodeCanvasElement';

import type { LoaderParser, ResolvedAsset } from 'pixi.js';

const { loadImage } = canvasModule;
const validMimes = ['image/png', 'image/jpg', 'image/jpeg', 'image/svg'];

function isSupportedDataURL(url: string): boolean
{
    const match = url.match(/^data:([^;]+);base64,/);

    if (!match) return false;

    const mimeType = match[1];

    return validMimes.includes(mimeType);
}

/** loads our textures into a node canvas */
export const loadNodeBase64 = {
    extension: {
        type: ExtensionType.LoadParser,
        priority: LoaderParserPriority.High,
    },
    id: 'node-base64-texture',

    test(url: string): boolean
    {
        return isSupportedDataURL(url);
    },

    async load(url: string, asset: ResolvedAsset): Promise<Texture>
    {
        const image = await loadImage(url);
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

extensions.add(loadNodeBase64);
