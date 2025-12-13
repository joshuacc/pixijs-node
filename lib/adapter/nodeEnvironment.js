'use strict';

var pixi_js = require('pixi.js');
var adapter = require('./adapter.js');

const nodeEnvironment = {
  extension: {
    type: pixi_js.ExtensionType.Environment,
    name: "node",
    priority: 10
  },
  test: () => typeof window === "undefined" || typeof document === "undefined",
  load: async () => {
    pixi_js.DOMAdapter.set(adapter.NodeAdapter);
  }
};

exports.nodeEnvironment = nodeEnvironment;
//# sourceMappingURL=nodeEnvironment.js.map
