const rollup = require('rollup');
const sequence = require('./utils/sequence');

// TODO: rollup node js config don't handle config file. mb use rollup cli + spawn?
// It will allow to better handle rollup.config.js and improve user experience
// To use it we need to figure out how to pass `configParams` to `configPath`
// https://rollupjs.org/guide/en#command-line-reference

// https://rollupjs.org/guide/en#javascript-api
module.exports = ({ configPath, configParams }) => {
  let configs = require(configPath);

  if (typeof configs === 'function') {
    configs = configs(configParams);
  }

  if (!Array.isArray(configs)) {
    configs = [configs];
  }

  return sequence(configs, async config => {
    const {output: outputOptions, ...inputOptions} = config;

    const bundle = await rollup.rollup(inputOptions);

    await bundle.write(outputOptions);
  });
};