'use strict';

var pixi_js = require('pixi.js');

const filters = {
  /** @deprecated */
  AlphaFilter: pixi_js.AlphaFilter,
  /** @deprecated */
  BlurFilter: pixi_js.BlurFilter,
  /** @deprecated */
  BlurFilterPass: pixi_js.BlurFilterPass,
  /** @deprecated */
  ColorMatrixFilter: pixi_js.ColorMatrixFilter,
  /** @deprecated */
  DisplacementFilter: pixi_js.DisplacementFilter,
  /** @deprecated */
  NoiseFilter: pixi_js.NoiseFilter
};
Object.entries(filters).forEach(([key, FilterClass]) => {
  Object.defineProperty(filters, key, {
    get() {
      pixi_js.deprecation("8.0.0", `filters.${key} has moved to ${key}`);
      return FilterClass;
    }
  });
});

exports.filters = filters;
//# sourceMappingURL=filters.js.map
