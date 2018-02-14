const rollup = require('rollup');

// TODO: mb use rollup cli + spawn. It will allow to better handle rollup.config.js
// https://rollupjs.org/guide/en#command-line-reference

// https://rollupjs.org/guide/en#javascript-api
module.exports = async ({ configPath, configParams, watch }) => {
  let config = require(configPath);

  if (typeof config === 'function') {
    config = config(configParams);
  }

  if (watch) {
    const watcher = rollup.watch(config);

    return new Promise((resolve, reject) => {
      watcher.on('event', event => {
        if (event.code === 'ERROR' || event.code === 'FATAL') {
          reject(event);
        }
      });
    });
  }

  const {output: outputOptions, ...inputOptions} = config;

  const bundle = await rollup.rollup(inputOptions);

  await bundle.write(outputOptions);
};