import canvasModule from 'canvas';

globalThis.requestAnimationFrame = function requestAnimationFrame(fn) {
  return setTimeout(fn, 1e3 / 60);
};
globalThis.cancelAnimationFrame = function cancelAnimationFrame(fn) {
  return clearTimeout(fn);
};
if (!globalThis.Image) {
  globalThis.Image = canvasModule.Image;
}
if (!globalThis.HTMLImageElement) {
  globalThis.HTMLImageElement = canvasModule.Image;
}
if (!globalThis.HTMLCanvasElement) {
  globalThis.HTMLCanvasElement = canvasModule.Canvas;
}
if (!globalThis.navigator) {
  globalThis.navigator = { userAgent: "node", gpu: null };
}
//# sourceMappingURL=polyfills.mjs.map
