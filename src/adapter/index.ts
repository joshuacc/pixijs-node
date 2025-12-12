import './polyfills';
import { extensions } from 'pixi.js';
import { NodeCanvasSource } from './NodeCanvasSource';

export * from './adapter';
export * from './nodeEnvironment';
export * from './loadNodeBase64';
export * from './loadNodeFont';
export * from './loadNodeTexture';
export * from './NodeCanvasElement';
export * from './NodeCanvasSource';

extensions.add(NodeCanvasSource);
