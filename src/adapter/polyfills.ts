import canvasModule from 'canvas';

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
