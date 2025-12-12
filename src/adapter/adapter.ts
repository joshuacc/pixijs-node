import canvasModule from 'canvas';
import { fetch, Request, Response } from 'cross-fetch';
import fs from 'fs';
import { WebGLRenderingContext } from 'gl';
import { DOMParser } from '@xmldom/xmldom';
import { path, Adapter } from 'pixi.js';
import { NodeCanvasElement } from './NodeCanvasElement';

export const NodeAdapter: Adapter = {
    /**
     * Creates a canvas element of the given size.
     * This canvas is created using the node-canvas package and uses the gl package to create a webgl context.
     * @param width - width of the canvas
     * @param height - height of the canvas
     */
    createCanvas: (width?: number, height?: number) => new NodeCanvasElement(width, height),
    createImage: () =>
    {
        const img = new canvasModule.Image() as any;

        img.crossOrigin = null;
        img.currentSrc = '';
        img.decode = async () => {};
        img.remove = () => {};

        return img;
    },
    getCanvasRenderingContext2D: () => ({ prototype: canvasModule.CanvasRenderingContext2D.prototype } as any),
    /** Returns a WebGL rendering context using the gl package. */
    getWebGLRenderingContext: () => WebGLRenderingContext,
    /** Returns the fake navigator object of `node` */
    getNavigator: () => ({ userAgent: 'node', gpu: null }),
    /** Returns the path from which the process is being run */
    getBaseUrl: () => process.cwd(),
    getFontFaceSet: (): any => null,
    fetch: (url: RequestInfo, options?: RequestInit) =>
    {
        const request = new Request(url, options);

        // Check if url starts with http(s) as only these are supported by node-fetch
        if (path.isUrl(request.url))
        {
            return fetch(url, request);
        }

        return new Promise((resolve, reject) =>
        {
            const rawPath = typeof url === 'string' ? url : decodeURI(request.url);

            // Normalize the path
            const filePath = path.normalize(rawPath);

            if (!fs.existsSync(filePath))
            {
                reject(new Error(`File not found: ${filePath}`));
            }
            const readStream = fs.createReadStream(filePath);

            readStream.on('open', () =>
            {
                resolve(new Response(readStream as unknown as ReadableStream, {
                    url: request.url,
                    status: 200,
                    statusText: 'OK',
                    size: fs.statSync(filePath).size,
                    timeout: (request as any).timeout,
                } as ResponseInit));
            });
        });
    },
    parseXML: (xml: string) =>
    {
        const parser = new DOMParser();

        return parser.parseFromString(xml, 'text/xml');
    },
};
