import canvasModule from 'canvas';
import { WebGLRenderingContext as HeadlessWebGLRenderingContext } from 'gl';

globalThis.requestAnimationFrame = function requestAnimationFrame(fn)
{
    return setTimeout(fn, 1000 / 60);
};

globalThis.cancelAnimationFrame = function cancelAnimationFrame(fn)
{
    return clearTimeout(fn);
};

// Provide minimal DOM-like globals that Pixi v8 expects.
if (!(globalThis as any).Image)
{
    (globalThis as any).Image = canvasModule.Image;
}

if (!(globalThis as any).HTMLImageElement)
{
    (globalThis as any).HTMLImageElement = canvasModule.Image;
}

if (!(globalThis as any).HTMLCanvasElement)
{
    (globalThis as any).HTMLCanvasElement = canvasModule.Canvas;
}

if (!(globalThis as any).navigator)
{
    (globalThis as any).navigator = { userAgent: 'node', gpu: null };
}

if (!(globalThis as any).WebGLRenderingContext)
{
    (globalThis as any).WebGLRenderingContext = HeadlessWebGLRenderingContext;
}

if (!(globalThis as any).WebGL2RenderingContext)
{
    // headless-gl exports a single WebGLRenderingContext class; reuse for feature detection.
    (globalThis as any).WebGL2RenderingContext = HeadlessWebGLRenderingContext;
}
