// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');

// eslint-disable-next-line no-undef
const currentDir = __dirname;
const projectRoot = currentDir;
const config = getDefaultConfig(currentDir);

module.exports = withNativeWind(config, {
  input: './app/global.css',
  projectRoot,
  inlineRem: false,
  features: {
    transformPercentagePolyfill: true,
  },
});
