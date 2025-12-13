import { ExtensionType, DOMAdapter } from 'pixi.js';
import { NodeAdapter } from './adapter.mjs';

const nodeEnvironment = {
  extension: {
    type: ExtensionType.Environment,
    name: "node",
    priority: 10
  },
  test: () => typeof window === "undefined" || typeof document === "undefined",
  load: async () => {
    DOMAdapter.set(NodeAdapter);
  }
};

export { nodeEnvironment };
//# sourceMappingURL=nodeEnvironment.mjs.map
