import canvasModule from 'canvas';
import { Request, fetch, Response } from 'cross-fetch';
import fs from 'fs';
import { WebGLRenderingContext } from 'gl';
import { DOMParser } from '@xmldom/xmldom';
import { path } from 'pixi.js';
import { NodeCanvasElement } from './NodeCanvasElement.mjs';

const NodeAdapter = {
  /**
   * Creates a canvas element of the given size.
   * This canvas is created using the node-canvas package and uses the gl package to create a webgl context.
   * @param width - width of the canvas
   * @param height - height of the canvas
   */
  createCanvas: (width, height) => new NodeCanvasElement(width, height),
  createImage: () => {
    const img = new canvasModule.Image();
    img.crossOrigin = null;
    img.currentSrc = "";
    img.decode = async () => {
    };
    img.remove = () => {
    };
    return img;
  },
  getCanvasRenderingContext2D: () => ({ prototype: canvasModule.CanvasRenderingContext2D.prototype }),
  /** Returns a WebGL rendering context using the gl package. */
  getWebGLRenderingContext: () => WebGLRenderingContext,
  /** Returns the fake navigator object of `node` */
  getNavigator: () => ({ userAgent: "node", gpu: null }),
  /** Returns the path from which the process is being run */
  getBaseUrl: () => process.cwd(),
  getFontFaceSet: () => null,
  fetch: (url, options) => {
    const request = new Request(url, options);
    if (path.isUrl(request.url)) {
      return fetch(url, request);
    }
    return new Promise((resolve, reject) => {
      const rawPath = typeof url === "string" ? url : decodeURI(request.url);
      const filePath = path.normalize(rawPath);
      if (!fs.existsSync(filePath)) {
        reject(new Error(`File not found: ${filePath}`));
      }
      const readStream = fs.createReadStream(filePath);
      readStream.on("open", () => {
        resolve(new Response(readStream, {
          url: request.url,
          status: 200,
          statusText: "OK",
          size: fs.statSync(filePath).size,
          timeout: request.timeout
        }));
      });
    });
  },
  parseXML: (xml) => {
    const parser = new DOMParser();
    return parser.parseFromString(xml, "text/xml");
  }
};

export { NodeAdapter };
//# sourceMappingURL=adapter.mjs.map
