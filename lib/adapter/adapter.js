'use strict';

var canvasModule = require('canvas');
var crossFetch = require('cross-fetch');
var fs = require('fs');
var createGLContext = require('gl');
var xmldom = require('@xmldom/xmldom');
var pixi_js = require('pixi.js');
var NodeCanvasElement = require('./NodeCanvasElement.js');

const NodeAdapter = {
  /**
   * Creates a canvas element of the given size.
   * This canvas is created using the node-canvas package and uses the gl package to create a webgl context.
   * @param width - width of the canvas
   * @param height - height of the canvas
   */
  createCanvas: (width, height) => new NodeCanvasElement.NodeCanvasElement(width, height),
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
  getWebGLRenderingContext: () => createGLContext.WebGLRenderingContext,
  /** Returns the fake navigator object of `node` */
  getNavigator: () => ({ userAgent: "node", gpu: null }),
  /** Returns the path from which the process is being run */
  getBaseUrl: () => process.cwd(),
  getFontFaceSet: () => null,
  fetch: (url, options) => {
    const request = new crossFetch.Request(url, options);
    if (pixi_js.path.isUrl(request.url)) {
      return crossFetch.fetch(url, request);
    }
    return new Promise((resolve, reject) => {
      const rawPath = typeof url === "string" ? url : decodeURI(request.url);
      const filePath = pixi_js.path.normalize(rawPath);
      if (!fs.existsSync(filePath)) {
        reject(new Error(`File not found: ${filePath}`));
      }
      const readStream = fs.createReadStream(filePath);
      readStream.on("open", () => {
        resolve(new crossFetch.Response(readStream, {
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
    const parser = new xmldom.DOMParser();
    return parser.parseFromString(xml, "text/xml");
  }
};

exports.NodeAdapter = NodeAdapter;
//# sourceMappingURL=adapter.js.map
