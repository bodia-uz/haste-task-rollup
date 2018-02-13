const rollup = require('rollup');

// NOTE: read more at https://rollupjs.org/guide/en#javascript-api
module.exports = async ({ inputOptions, outputOptions, watch, watchOptions }) => {
  if (watch) {
    const watcher = rollup.watch({
      ...inputOptions,
      output: [outputOptions],
      watch: watchOptions
    });

    return new Promise((resolve, reject) => {
      watcher.on('event', event => {
        if (event.code === 'ERROR' || event.code === 'FATAL') {
          reject(event);
        }

        if (event.code === 'END') {
          resolve(event);
        }
      });
    });
  }

  const bundle = await rollup.rollup(inputOptions);

  await bundle.write(outputOptions);
};