// @pixi/extension-scripts has built-in support for Jest
// but it has feature enabled (like using Electron runner)
// but we don't need it for this node-only project
export default {
    preset: 'ts-jest/presets/default-esm',
    testEnvironment: 'node',
    extensionsToTreatAsEsm: ['.ts'],
    globals: {
        'ts-jest': {
            useESM: true,
            tsconfig: {
                allowJs: true,
            },
        },
    },
    transform: {
        '^.+\\.(ts|tsx|js)$': ['ts-jest', {
            useESM: true,
            tsconfig: {
                allowJs: true,
            },
        }],
    },
    transformIgnorePatterns: ['/node_modules/(?!.*(pixi\\.js|earcut)/)'],
};
