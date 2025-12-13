import { deprecation, AlphaFilter, BlurFilter, BlurFilterPass, ColorMatrixFilter, DisplacementFilter, NoiseFilter } from 'pixi.js';

const filters = {
  /** @deprecated */
  AlphaFilter,
  /** @deprecated */
  BlurFilter,
  /** @deprecated */
  BlurFilterPass,
  /** @deprecated */
  ColorMatrixFilter,
  /** @deprecated */
  DisplacementFilter,
  /** @deprecated */
  NoiseFilter
};
Object.entries(filters).forEach(([key, FilterClass]) => {
  Object.defineProperty(filters, key, {
    get() {
      deprecation("8.0.0", `filters.${key} has moved to ${key}`);
      return FilterClass;
    }
  });
});

export { filters };
//# sourceMappingURL=filters.mjs.map
