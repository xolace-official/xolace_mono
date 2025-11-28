// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');
const { withUniwindConfig } = require('uniwind/metro');

// eslint-disable-next-line no-undef
const currentDir = __dirname;
const projectRoot = currentDir;
const config = getDefaultConfig(currentDir);

module.exports = withUniwindConfig(config, {
  cssEntryFile: './global.css',
  projectRoot,
  dtsFile: './uniwind-types.d.ts',
  extraThemes: ['sunset'],
  polyfills: {
    rem: 14,
  },
});
